import AsyncStorage from '@react-native-async-storage/async-storage';
import { PermissionsAndroid, Platform } from 'react-native';
import { getApp, getApps } from '@react-native-firebase/app';
import {
  AuthorizationStatus,
  getAPNSToken,
  getMessaging,
  getToken,
  requestPermission,
  setAutoInitEnabled,
} from '@react-native-firebase/messaging';

const PUSH_TOKEN_STORAGE_KEY = 'push_notification_token';
const DEVICE_ID_STORAGE_KEY = 'app_device_id';
const APNS_TOKEN_RETRY_COUNT = 12;
const APNS_TOKEN_RETRY_DELAY_MS = 1000;

const getMessagingInstance = () => {
  if (getApps().length === 0) {
    return null;
  }

  return getMessaging(getApp());
};

const savePushToken = async (token: string) => {
  await AsyncStorage.setItem(PUSH_TOKEN_STORAGE_KEY, token);
  console.log('FCM token:', token);
};

const createDeviceId = () => {
  const randomPart = Math.random().toString(36).slice(2, 12);
  const timePart = Date.now().toString(36);

  return `${Platform.OS}-${timePart}-${randomPart}`;
};

const getStoredPushToken = async () => {
  const token = await AsyncStorage.getItem(PUSH_TOKEN_STORAGE_KEY);
  return token?.trim() || null;
};

const getStoredDeviceId = async () => {
  const deviceId = await AsyncStorage.getItem(DEVICE_ID_STORAGE_KEY);
  return deviceId?.trim() || null;
};

const getOrCreateStableDeviceId = async () => {
  const storedDeviceId = await getStoredDeviceId();

  if (storedDeviceId) {
    return storedDeviceId;
  }

  const deviceId = createDeviceId();
  await AsyncStorage.setItem(DEVICE_ID_STORAGE_KEY, deviceId);

  return deviceId;
};

const wait = (delayMs: number) =>
  new Promise<void>(resolve => setTimeout(resolve, delayMs));

const waitForApnsToken = async (
  messagingInstance: NonNullable<ReturnType<typeof getMessagingInstance>>,
) => {
  for (let attempt = 0; attempt < APNS_TOKEN_RETRY_COUNT; attempt += 1) {
    const apnsToken = await getAPNSToken(messagingInstance);

    if (apnsToken) {
      console.log('APNs token:', apnsToken);
      return apnsToken;
    }

    await wait(APNS_TOKEN_RETRY_DELAY_MS);
  }

  console.log('APNs token is not available yet on iOS.');
  return null;
};

const registerForRemoteMessages = async (
  messagingInstance: NonNullable<ReturnType<typeof getMessagingInstance>>,
) => {
  if (Platform.OS !== 'ios') {
    return true;
  }

  const apnsToken = await waitForApnsToken(messagingInstance);
  return Boolean(apnsToken);
};

const requestNotificationAccess = async () => {
  const messagingInstance = getMessagingInstance();

  if (!messagingInstance) {
    console.log(
      'Firebase is not configured for this app flavor. Skipping notification setup.',
    );
    return null;
  }

  await setAutoInitEnabled(messagingInstance, true);

  if (Platform.OS === 'ios') {
    const authStatus = await requestPermission(messagingInstance);
    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      console.log('Notification permission not granted on iOS.');
      return null;
    }

    const isRegisteredWithApns = await registerForRemoteMessages(
      messagingInstance,
    );

    if (!isRegisteredWithApns) {
      console.log(
        'iOS notification permission is granted, but APNs did not return a token yet.',
      );
    }
  }

  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (result !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Notification permission not granted on Android.');
    }
  }

  return messagingInstance;
};

const resolvePushToken = async () => {
  const messagingInstance = await requestNotificationAccess();

  if (!messagingInstance) {
    return null;
  }

  if (Platform.OS === 'ios') {
    const apnsToken = await waitForApnsToken(messagingInstance);

    if (!apnsToken) {
      throw new Error(
        'APNs token unavailable. Run on a real iPhone with Push Notifications capability and a valid provisioning profile.',
      );
    }
  }

  const token = await getToken(messagingInstance);
  await savePushToken(token);

  return { messagingInstance, token };
};

export const getOrCreatePushToken = async () => {
  const storedToken = await getStoredPushToken();

  if (storedToken) {
    return storedToken;
  }

  try {
    const resolved = await resolvePushToken();
    return resolved?.token ?? null;
  } catch (error) {
    console.log('Unable to resolve push token:', error);
    return null;
  }
};

export const getOrCreateDeviceId = async () => {
  const pushToken = await getOrCreatePushToken();

  if (pushToken) {
    return pushToken;
  }

  const deviceId = await getOrCreateStableDeviceId();
  console.log('Using stable app device ID:', deviceId);

  return deviceId;
};
