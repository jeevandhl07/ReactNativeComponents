import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from '../../screens';

export type AuthStackParamList = {
  MainScreen: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
