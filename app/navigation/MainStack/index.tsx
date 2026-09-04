import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomSheetScreen, MainScreen } from '../../screens';
import { MainStackParamList } from '../types';

const Stack = createStackNavigator<MainStackParamList>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="BottomSheetScreen" component={BottomSheetScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
