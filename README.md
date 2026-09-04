# ReactNativeComponents

A React Native starter and component-library project for building reusable mobile UI with navigation, Redux Toolkit, RTK Query, persisted auth state, Firebase messaging, vector icons, and polished preview screens.

This project is meant to grow into a full React Native app foundation. Add reusable components in `app/components/ui`, preview them from screens, and keep shared app infrastructure ready for real API work.

## Tech Stack

- React Native `0.86.2`
- React `19.2.3`
- TypeScript
- React Navigation Stack
- Redux Toolkit and RTK Query
- Redux Persist with AsyncStorage
- React Native Gesture Handler
- React Native Safe Area Context
- React Native Vector Icons
- React Native Firebase App and Messaging
- Jest and ESLint

## Setup

Install dependencies:

```sh
npm install
```

Start Metro:

```sh
npm start
```

Run Android:

```sh
npm run android
```

Run iOS:

```sh
cd ios
pod install
cd ..
npm run ios
```

Run checks:

```sh
npm run lint
npm test
```

## iOS Pods

The Podfile is configured for React Native Firebase with CocoaPods instead of Firebase SPM.

Important settings in `ios/Podfile`:

```ruby
source 'https://github.com/CocoaPods/Specs.git'

$RNFirebaseDisableSPM = true
use_modular_headers!
```

Why:

- Firebase SPM with static linkage can create duplicate-symbol issues.
- Firebase CocoaPods static integration needs modular headers for Swift pods like `FirebaseCoreInternal`.
- The git specs source avoids CocoaPods CDN HTTP2 failures on some machines.

If pods fail after changing native dependencies:

```sh
cd ios
pod install --repo-update
```

## Project Structure

```text
app/
  assets/
    fonts/              Custom fonts and icon fonts
    icon/               Shared vector icon wrapper
    images/             App images
    mainAppIcons/       Launcher and splash assets
  components/
    ui/                 Reusable UI components
    index.ts            Component exports
  constants/
    colors.ts           Color tokens and app themes
    config.ts           API/client configuration
    dimensions.ts       Scaling helpers
    spacing.ts          Spacing, radius, font constants
  navigation/
    MainStack/          Main app stack
    RootNavigator.tsx   Root navigation
    NavigationServices.ts
  redux/
    api/                RTK Query APIs
    reducer/            Redux slices
    store.ts            Store, persistence, middleware
  screens/
    MainScreen/         Component catalogue
    BottomSheetScreen/  Bottom sheet/dropdown previews
    ToastScreen/        Toast previews
  services/
    pushNotifications.ts
  types/
    apiTypes.ts         API request/response types
  utils/
    baseQueryWithReauth.ts
    getAccessToken.ts
    helper.ts
```

## Components

Reusable UI components live in `app/components/ui`.

Current components:

- `AppHeader`
- `BottomSheet`
- `Container`
- `Dropdown`
- `MultiSelectDropdown`
- `Portal`
- `Toast`

Export new components from `app/components/index.ts`:

```ts
export { default as MyComponent } from './ui/MyComponent';
```

Then import them from screens:

```ts
import { BottomSheet, Dropdown, Toast } from '../../components';
```

## BottomSheet

File: `app/components/ui/BottomSheet.tsx`

Use it for bottom actions, pickers, compact forms, filters, confirmations, and dropdown sheets.

```tsx
const [visible, setVisible] = useState(false);

<BottomSheet visible={visible} onClose={() => setVisible(false)}>
  <Text>Sheet content</Text>
</BottomSheet>;
```

Props:

```ts
type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  maxHeight?: number;
  closeOnBackdropPress?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onDismiss?: () => void;
  enableContentDrag?: boolean;
  canDragContent?: boolean;
};
```

Behavior:

- Uses `Portal`, not React Native `Modal`.
- Uses `PanGestureHandler` and `Animated`.
- Supports backdrop close and drag-down close.
- Can enable whole-content drag.
- Handles Android keyboard/status-bar spacing.
- Caps height to `80%` of available screen area.

## Dropdown

File: `app/components/ui/Dropdown.tsx`

Use it for a searchable single-select picker inside a bottom sheet.

```tsx
const [farm, setFarm] = useState('');

<Dropdown
  label="Farm Name"
  options={['Ram Hatchery', 'Nepal Hatchery']}
  value={farm}
  placeholder="Select farm"
  onChange={setFarm}
/>;
```

Props:

```ts
type DropdownProps = {
  label: string;
  options: string[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};
```

Behavior:

- Field UI matches mobile form input style.
- Opens a searchable bottom sheet.
- More data creates a taller sheet up to the safe max height.
- Selecting an item closes the sheet.
- Scroll and drag close are coordinated for Android.

## MultiSelectDropdown

File: `app/components/ui/MultiSelectDropdown.tsx`

Use it when the user can select multiple values from a searchable sheet.

```tsx
const [farms, setFarms] = useState<string[]>([]);

<MultiSelectDropdown
  label="Farm Names"
  options={['Ram Hatchery', 'Nepal Hatchery', 'Valley Poultry Hatchery']}
  values={farms}
  placeholder="Select farms"
  onChange={setFarms}
/>;
```

Props:

```ts
type MultiSelectDropdownProps = {
  label: string;
  options: string[];
  values?: string[];
  placeholder?: string;
  onChange: (values: string[]) => void;
  style?: StyleProp<ViewStyle>;
};
```

Behavior:

- Uses the same visual style as `Dropdown`.
- Tapping options stages selection inside the sheet.
- Values commit only when `Done` is pressed.
- `Clear` clears all values and closes the sheet.
- Shows selected values or selected count in the field.
- Supports search, checkmarks, dynamic height, and scroll-aware drag close.

## Toast

File: `app/components/ui/Toast.tsx`

Use it for short mobile feedback after an action.

```tsx
const [toastVisible, setToastVisible] = useState(false);

<Toast
  visible={toastVisible}
  variant="success"
  title="Success"
  message="Saved successfully."
  onHide={() => setToastVisible(false)}
/>;
```

Props:

```ts
type ToastProps = {
  visible: boolean;
  message: string;
  title?: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  position?: 'top' | 'bottom';
  duration?: number;
  onHide: () => void;
  style?: StyleProp<ViewStyle>;
};
```

Behavior:

- Uses `Portal`.
- Animated show/hide.
- Native snackbar-style surface.
- Supports `success`, `error`, `warning`, and `info`.
- Supports `top` and `bottom` positions.
- Swipe left or right to dismiss.

## Portal

File: `app/components/ui/Portal.tsx`

`Portal` renders floating UI above the current screen, such as bottom sheets and toasts.

Wrap the app once:

```tsx
<PortalProvider>
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
</PortalProvider>
```

Current root setup is in `App.tsx`.

## Navigation

Navigation files:

```text
app/navigation/RootNavigator.tsx
app/navigation/MainStack/index.tsx
app/navigation/NavigationServices.ts
```

Add a new screen:

1. Create the screen folder in `app/screens/NewScreen`.
2. Export it from `app/screens/index.ts`.
3. Add it to `MainStackParamList` in `app/navigation/MainStack/index.tsx`.
4. Add a `<Stack.Screen />` in `app/navigation/MainStack/index.tsx`.
5. Add a card in `app/screens/MainScreen/index.tsx`.

Example route type:

```ts
export type MainStackParamList = {
  MainScreen: undefined;
  BottomSheetScreen: undefined;
  ToastScreen: undefined;
  DateRangePickerScreen: undefined;
};
```

## Redux Toolkit

Redux files:

```text
app/redux/store.ts
app/redux/reducer/userReducer.ts
app/redux/api/userAPI.ts
app/redux/api/dropdownAPI.ts
```

The store includes:

- `user` reducer persisted with AsyncStorage
- `userAPI` RTK Query reducer and middleware
- `dropdownAPI` RTK Query reducer and middleware
- `setupListeners(store.dispatch)` for RTK Query refetch behavior
- `resetApiState(dispatch)` helper to clear API cache

Store exports:

```ts
export const store = configureStore(...);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## Redux App Wiring

When using Redux/RTK Query in the app, wrap the root with `Provider` and `PersistGate`.

```tsx
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/redux/store';

<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <GestureHandlerRootView style={styles.safeArea}>
      <PortalProvider>
        <NavigationContainer ref={navigationRef}>
          <RootNavigator />
        </NavigationContainer>
      </PortalProvider>
    </GestureHandlerRootView>
  </PersistGate>
</Provider>;
```

Install `react-redux` if it is not already installed:

```sh
npm install react-redux
```

## User Slice

File: `app/redux/reducer/userReducer.ts`

State includes auth tokens, refresh token, expiry, profile fields, KYC/status fields, `isLoggedIn`, and `isLoading`.

Actions:

```ts
setUser(user);
clearUser();
setLoading(boolean);
setKycStatus(status);
```

Selector:

```ts
selectUserInfo;
```

Example:

```tsx
const user = useSelector(selectUserInfo);
const dispatch = useDispatch<AppDispatch>();

dispatch(clearUser());
```

## RTK Query APIs

### userAPI

File: `app/redux/api/userAPI.ts`

Endpoints:

```ts
useRequestOtpMutation();
useLoginMutation();
```

Example:

```tsx
const [requestOtp, { isLoading }] = useRequestOtpMutation();

await requestOtp({ mobileNumber: '9800000000' }).unwrap();
```

### dropdownAPI

File: `app/redux/api/dropdownAPI.ts`

Endpoints:

```ts
useGetStateDistrictQuery('');
useGetCityQuery(districtId);
useGetBankQuery('');
```

Example:

```tsx
const { data, isLoading, error } = useGetBankQuery('');
```

## Authenticated API Calls

File: `app/utils/baseQueryWithReauth.ts`

`baseQueryWithReauth` is shared by RTK Query APIs.

It handles:

- Base URL from `SERVER`
- Client credentials token for public/anonymous API calls
- User bearer token for logged-in API calls
- JWT expiry checks
- Refresh token flow
- Retry after successful refresh
- Clearing user state if session is expired

Configure backend URLs in `app/constants/config.ts`:

```ts
export const SERVER = 'https://your_backend_url.com';
```

## Adding a New API

Create a file in `app/redux/api/productAPI.ts`:

```ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../utils/baseQueryWithReauth';

export const productAPI = createApi({
  reducerPath: 'productApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Product'],
  endpoints: builder => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      providesTags: ['Product'],
    }),
  }),
});

export const { useGetProductsQuery } = productAPI;
```

Register it in `app/redux/store.ts`:

```ts
import { productAPI } from './api/productAPI';

export const store = configureStore({
  reducer: {
    [productAPI.reducerPath]: productAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(productAPI.middleware),
});
```

Also add it to `resetApiState` if it should clear on logout.

## Push Notifications

File: `app/services/pushNotifications.ts`

Helpers:

```ts
getOrCreatePushToken();
getOrCreateDeviceId();
```

Behavior:

- Requests iOS notification permission.
- Requests Android 13+ `POST_NOTIFICATIONS`.
- Waits for APNs token on iOS.
- Saves FCM token in AsyncStorage.
- Falls back to a stable generated device ID if push token cannot be resolved.

For iOS push notifications, use a real iPhone with Firebase configured, APNs configured in Firebase, Push Notifications capability enabled, and a valid provisioning profile.

## Assets, Fonts, and Icons

Fonts live in `app/assets/fonts`.

Vector icons are wrapped by `app/assets/icon/index.tsx`.

```tsx
<Icon type="ion" name="chevron-forward" size={18} color="#98a2b3" />
```

Supported icon sets:

- Ionicons
- EvilIcons
- Feather
- MaterialIcons
- Entypo
- Fontisto

## Styling Rules

Use shared constants:

```ts
import {
  APP_THEMES,
  BORDER_RADIUS,
  COLORS,
  FONT_FAMILY,
  SPACING,
  moderateScale,
  verticalScale,
} from '../../constants';
```

Guidelines:

- Put reusable UI in `app/components/ui`.
- Put screen-specific styles in each screen folder.
- Use `APP_THEMES.light` or `APP_THEMES.dark` for themed values.
- Use `SPACING`, `BORDER_RADIUS`, and font constants instead of magic numbers.
- Use `moderateScale` for horizontal/font sizing.
- Use `verticalScale` for vertical spacing and heights.

## Adding a New Component Preview

1. Add the reusable component in `app/components/ui`.
2. Export it from `app/components/index.ts`.
3. Create a screen under `app/screens`.
4. Export the screen from `app/screens/index.ts`.
5. Add the route type in `app/navigation/MainStack/index.tsx`.
6. Add the route in `app/navigation/MainStack/index.tsx`.
7. Add the component card in `app/screens/MainScreen/index.tsx`.
8. Run lint, tests, and native build checks.

## Verification Commands

Use these before committing:

```sh
npm run lint
npm test -- --runInBand --watchman=false
cd android && ./gradlew app:assembleDebug
cd ios && pod install
```

## Common Issues

### Gesture handler errors

Make sure `index.js` imports gesture handler before the app:

```ts
import 'react-native-gesture-handler';
```

Make sure `App.tsx` wraps the app with `GestureHandlerRootView`.

### Floating UI not showing

Make sure `PortalProvider` wraps navigation in `App.tsx`.

### iOS Firebase pod errors

Run:

```sh
cd ios
pod install --repo-update
```

Check that `ios/Podfile` includes:

```ruby
$RNFirebaseDisableSPM = true
use_modular_headers!
```

### Android icon font missing

`react-native-vector-icons` copies fonts during Android build.

```sh
cd android
./gradlew app:assembleDebug
```
