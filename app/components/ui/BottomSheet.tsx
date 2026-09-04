import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  EmitterSubscription,
  Keyboard,
  KeyboardEvent,
  Platform,
  Pressable,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  APP_THEMES,
  BORDER_RADIUS,
  FONT_FAMILY,
  moderateScale,
  SCREEN_HEIGHT,
  SPACING,
  verticalScale,
} from '../../constants';
import { Portal } from './Portal';

type BottomSheetProps = PropsWithChildren<{
  visible: boolean;
  onClose: () => void;
  title?: string;
  maxHeight?: number;
  closeOnBackdropPress?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onDismiss?: () => void;
  enableContentDrag?: boolean;
  canDragContent?: boolean;
}>;

const BottomSheet = ({
  visible,
  onClose,
  title,
  maxHeight = SCREEN_HEIGHT * 0.72,
  closeOnBackdropPress = true,
  containerStyle,
  onDismiss,
  enableContentDrag = false,
  canDragContent = true,
  children,
}: BottomSheetProps) => {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const [isMounted, setIsMounted] = useState(visible);
  const [keyboardTop, setKeyboardTop] = useState(0);
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const keyboardOffset = useRef(new Animated.Value(0)).current;
  const wasVisible = useRef(visible);
  const theme = APP_THEMES.light;
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : insets.top;
  const safeTopGap = statusBarHeight + SPACING.xl;
  const visibleWindowHeight = keyboardTop
    ? Math.min(windowHeight, keyboardTop)
    : windowHeight;
  const screenMaxHeight = visibleWindowHeight * 0.8;
  const resolvedMaxHeight = Math.min(
    maxHeight,
    screenMaxHeight,
    visibleWindowHeight - safeTopGap,
  );
  const hiddenPosition = resolvedMaxHeight + insets.bottom + verticalScale(32);
  const closedPosition = Math.max(SCREEN_HEIGHT, windowHeight, hiddenPosition);
  const sheetTranslateY = translateY.interpolate({
    inputRange: [0, closedPosition],
    outputRange: [0, closedPosition],
    extrapolate: 'clamp',
  });
  const backdropOpacity = translateY.interpolate({
    inputRange: [0, closedPosition],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const keyboardTranslateY = Animated.multiply(keyboardOffset, -1);

  const animateTo = useCallback(
    (toValue: number, onComplete?: () => void) => {
      translateY.stopAnimation();
      Animated.spring(translateY, {
        toValue,
        useNativeDriver: true,
        damping: Platform.OS === 'android' ? 28 : 24,
        stiffness: Platform.OS === 'android' ? 260 : 210,
        mass: 0.8,
        restDisplacementThreshold: 0.6,
        restSpeedThreshold: 0.6,
      }).start(({ finished }) => {
        if (finished) {
          onComplete?.();
        }
      });
    },
    [translateY],
  );

  const animateKeyboardOffset = useCallback(
    (toValue: number, duration = 220) => {
      keyboardOffset.stopAnimation();
      Animated.timing(keyboardOffset, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start();
    },
    [keyboardOffset],
  );

  const requestClose = useCallback(() => {
    Keyboard.dismiss();
    setKeyboardTop(0);
    animateKeyboardOffset(0, 80);
    onClose();
  }, [animateKeyboardOffset, onClose]);

  const handleGesture = useCallback(
    (event: PanGestureHandlerGestureEvent) => {
      translateY.setValue(Math.max(event.nativeEvent.translationY, 0));
    },
    [translateY],
  );

  const handleGestureStateChange = useCallback(
    (event: PanGestureHandlerStateChangeEvent) => {
      if (event.nativeEvent.oldState !== State.ACTIVE) {
        return;
      }

      const { translationY, velocityY } = event.nativeEvent;
      const shouldClose =
        translationY > resolvedMaxHeight * 0.24 ||
        velocityY > verticalScale(850);

      if (shouldClose) {
        requestClose();
        return;
      }

      animateTo(0);
    },
    [animateTo, requestClose, resolvedMaxHeight],
  );

  useEffect(() => {
    if (visible) {
      const shouldOpen = !wasVisible.current;
      wasVisible.current = true;

      if (!isMounted) {
        setIsMounted(true);
      }

      if (shouldOpen) {
        translateY.setValue(closedPosition);
        animateTo(0);
      }

      return;
    }

    wasVisible.current = false;

    if (isMounted) {
      setKeyboardTop(0);
      animateKeyboardOffset(0, 80);
      animateTo(closedPosition, () => {
        setIsMounted(false);
        onDismiss?.();
      });
    }
  }, [
    animateKeyboardOffset,
    animateTo,
    closedPosition,
    isMounted,
    onDismiss,
    translateY,
    visible,
  ]);

  useEffect(() => {
    const handleKeyboardShow = (event: KeyboardEvent) => {
      const nextHeight = event.endCoordinates.height;
      const nextKeyboardTop = Math.max(event.endCoordinates.screenY, 0);
      const nextKeyboardLift =
        Platform.OS === 'ios' ? Math.max(nextHeight - insets.bottom, 0) : 0;

      setKeyboardTop(nextKeyboardTop);
      animateKeyboardOffset(nextKeyboardLift, event.duration || 220);
    };

    const handleKeyboardHide = () => {
      setKeyboardTop(0);
      animateKeyboardOffset(0, 80);
    };

    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const subscriptions: EmitterSubscription[] = [
      Keyboard.addListener(showEvent, handleKeyboardShow),
      Keyboard.addListener(hideEvent, handleKeyboardHide),
    ];

    return () => {
      subscriptions.forEach(subscription => subscription.remove());
    };
  }, [animateKeyboardOffset, insets.bottom]);

  if (!isMounted) {
    return null;
  }

  const shouldDragWholeSheet = enableContentDrag && canDragContent;
  const downwardOnlyOffset: [number, number] = [
    -SCREEN_HEIGHT,
    verticalScale(6),
  ];
  const dragHandle = (
    <PanGestureHandler
      activeOffsetY={downwardOnlyOffset}
      failOffsetX={[-moderateScale(18), moderateScale(18)]}
      onGestureEvent={handleGesture}
      onHandlerStateChange={handleGestureStateChange}
    >
      <View style={styles.dragArea}>
        <View style={styles.handle} />
      </View>
    </PanGestureHandler>
  );

  const sheet = (
    <Animated.View
      style={[
        styles.sheet,
        {
          maxHeight: resolvedMaxHeight,
          height: keyboardTop ? resolvedMaxHeight : undefined,
          paddingBottom: Math.max(insets.bottom, SPACING.md),
          backgroundColor: theme.surface,
          borderColor: theme.border,
          transform: [
            { translateY: keyboardTranslateY },
            { translateY: sheetTranslateY },
          ],
        },
        containerStyle,
      ]}
    >
      {dragHandle}

      {title ? (
        <Text style={[styles.title, { color: theme.ink }]}>{title}</Text>
      ) : null}

      {children}
    </Animated.View>
  );

  const content = (
    <View
      pointerEvents="box-none"
      style={[styles.portal, { paddingTop: safeTopGap }]}
    >
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
        <Pressable
          disabled={!closeOnBackdropPress}
          onPress={requestClose}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <PanGestureHandler
        enabled={shouldDragWholeSheet}
        activeOffsetY={downwardOnlyOffset}
        failOffsetX={[-moderateScale(18), moderateScale(18)]}
        onGestureEvent={handleGesture}
        onHandlerStateChange={handleGestureStateChange}
      >
        <Animated.View style={styles.sheetWrapper}>{sheet}</Animated.View>
      </PanGestureHandler>
    </View>
  );

  return <Portal>{content}</Portal>;
};

const styles = StyleSheet.create({
  portal: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(7, 26, 69, 0.42)',
  },
  sheet: {
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    overflow: 'hidden',
    paddingHorizontal: SPACING.md,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: verticalScale(-8) },
    shadowOpacity: 0.16,
    shadowRadius: moderateScale(18),
    elevation: 18,
  },
  sheetWrapper: {
    width: '100%',
  },
  dragArea: {
    alignItems: 'center',
    paddingBottom: SPACING.sm,
    paddingTop: SPACING.sm,
  },
  handle: {
    backgroundColor: '#B7C3D6',
    borderRadius: moderateScale(999),
    height: verticalScale(4),
    width: moderateScale(46),
  },
  title: {
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(20),
    marginBottom: SPACING.md,
  },
});

export default BottomSheet;
