import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Platform, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './app/navigation/RootNavigator';
import { navigationRef } from './app/navigation/NavigationServices';
import { PortalProvider } from './app/components';

function App() {
  const Wrapper = Platform.OS === 'android' ? SafeAreaView : View;

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={styles.safeArea}>
      <PortalProvider>
        <NavigationContainer ref={navigationRef}>
          <Wrapper style={styles.safeArea}>
            <RootNavigator />
          </Wrapper>
        </NavigationContainer>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
