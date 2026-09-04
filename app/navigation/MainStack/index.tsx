import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  BottomSheetScreen,
  KeyboardAvoidFormScreen,
  MainScreen,
  ToastScreen,
} from '../../screens';

export type MainStackParamList = {
  MainScreen: undefined;
  BottomSheetScreen: undefined;
  KeyboardAvoidFormScreen: undefined;
  ToastScreen: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="BottomSheetScreen" component={BottomSheetScreen} />
      <Stack.Screen
        name="KeyboardAvoidFormScreen"
        component={KeyboardAvoidFormScreen}
      />
      <Stack.Screen name="ToastScreen" component={ToastScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
