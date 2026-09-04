# ReactNativeComponents

A React Native component foundation with reusable UI, navigation previews, Redux Toolkit, RTK Query APIs, persisted auth, Firebase messaging setup, vector icons, and Android/iOS fixes.

## Stack

- React Native `0.86.2`
- React `19.2.3`
- TypeScript
- React Navigation
- Redux Toolkit + RTK Query
- Redux Persist + AsyncStorage
- React Native Gesture Handler
- React Native Safe Area Context
- React Native Vector Icons
- React Native Firebase

## Setup

```sh
npm install
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

Checks:

```sh
npm run lint
npm test -- --runInBand --watchman=false
```

## Folder Structure

```text
app/
  assets/        Fonts, icons, images
  components/    Reusable UI components
  constants/     Colors, spacing, dimensions, config
  navigation/    Root and main stack navigation
  redux/         Store, slices, RTK Query APIs
  screens/       Component preview screens
  services/      Push notification helpers
  types/         Shared TypeScript types
  utils/         API/auth helpers
```

## Components

Reusable components are inside `app/components/ui`.

Current components:

- `AppHeader`
- `BottomSheet`
- `Container`
- `Dropdown`
- `MultiSelectDropdown`
- `Portal`
- `Toast`

Import from:

```tsx
import { BottomSheet, Dropdown, MultiSelectDropdown, Toast } from './app/components';
```

## BottomSheet

`BottomSheet` is a custom sheet built without React Native `Modal`. It uses `Portal`, `PanGestureHandler`, and animation.

```tsx
<BottomSheet visible={visible} onClose={() => setVisible(false)}>
  <Text>Sheet content</Text>
</BottomSheet>
```

Main props:

- `visible`
- `onClose`
- `title`
- `maxHeight`
- `closeOnBackdropPress`
- `enableContentDrag`
- `canDragContent`

## Dropdown

Single-select searchable dropdown using `BottomSheet`.

```tsx
<Dropdown
  label="Farm Name"
  options={['Ram Hatchery', 'Nepal Hatchery']}
  value={farm}
  placeholder="Select farm"
  onChange={setFarm}
/>
```

## MultiSelectDropdown

Multi-select searchable dropdown using the same bottom sheet design.

```tsx
<MultiSelectDropdown
  label="Farm Names"
  options={options}
  values={selectedFarms}
  placeholder="Select farms"
  onChange={setSelectedFarms}
/>
```

Items are staged inside the sheet and saved only after pressing `Done`. `Clear` removes all selected values and closes the sheet.

## Toast

Animated mobile toast message with `success`, `error`, `warning`, and `info` variants.

```tsx
<Toast
  visible={visible}
  variant="success"
  title="Success"
  message="Saved successfully."
  onHide={() => setVisible(false)}
/>
```

Top toasts respect iOS safe area.

## Redux And RTK Query

Store file:

```text
app/redux/store.ts
```

The app is wrapped with:

- `Provider`
- `PersistGate`
- `SafeAreaProvider`
- `GestureHandlerRootView`
- `PortalProvider`
- `NavigationContainer`

Available APIs:

```text
app/redux/api/userAPI.ts
app/redux/api/dropdownAPI.ts
```

User API hooks:

```tsx
const [requestOtp] = useRequestOtpMutation();
const [login] = useLoginMutation();
```

Dropdown API hooks:

```tsx
const { data: banks } = useGetBankQuery('');
const { data: cities } = useGetCityQuery(districtId);
const { data: districts } = useGetStateDistrictQuery('');
```

Authenticated requests use:

```text
app/utils/baseQueryWithReauth.ts
```

Backend config:

```text
app/constants/config.ts
```

Update `SERVER` before connecting a real backend.

## Add A New Component

1. Create component in `app/components/ui`.
2. Export it from `app/components/index.ts`.
3. Create a preview screen in `app/screens`.
4. Export the screen from `app/screens/index.ts`.
5. Add route in `app/navigation/MainStack/index.tsx`.
6. Add card in `app/screens/MainScreen/index.tsx`.

## iOS Notes

The Podfile uses CocoaPods Firebase integration:

```ruby
source 'https://github.com/CocoaPods/Specs.git'

$RNFirebaseDisableSPM = true
use_modular_headers!
```

If pods fail:

```sh
cd ios
pod install --repo-update
```

## Common Fixes

Gesture handler error:

```ts
import 'react-native-gesture-handler';
```

Icon font duplicate on iOS:

- Keep vector icon fonts copied by the `RNVectorIcons` pod.
- Do not manually add the same icon font to the app target resources.

Android build:

```sh
cd android
./gradlew app:assembleDebug
```
