import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { APP_THEMES } from './app/constants';
import { MainScreen } from './app/screens';

function App() {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? APP_THEMES.dark : APP_THEMES.light;

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.canvas}
      />
      <MainScreen />
    </SafeAreaProvider>
  );
}

export default App;
