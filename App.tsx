import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './app/navigation/RootNavigator';
import { navigationRef } from './app/navigation/NavigationServices';

function App() {
  const Wrapper = Platform.OS === 'android' ? SafeAreaView : View;

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Wrapper style={styles.safeArea}>
        <RootNavigator />
      </Wrapper>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
