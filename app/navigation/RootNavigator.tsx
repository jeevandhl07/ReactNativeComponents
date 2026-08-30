import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainStack from './MainStack';

export type RootStackParamList = {
  MainStack: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainStack" component={MainStack} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
