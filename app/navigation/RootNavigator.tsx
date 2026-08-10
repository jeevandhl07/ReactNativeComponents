import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import AuthStack from './AuthStack';
import DashBoardStack from './DashBoardStack';
import { selectUserInfo } from '../redux/reducer/userReducer';

export type RootStackParamList = {
  AuthStack: undefined;
  DashBoardStack: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  // const [loading, setLoading] = useState(true);

  const userInfo = useSelector(selectUserInfo);
  const isLoggedIn = userInfo?.isLoggedIn;

  // if (loading) {
  //   return null;
  // }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="DashBoardStack" component={DashBoardStack} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
