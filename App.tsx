import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Platform, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator from './app/navigation/RootNavigator';
import { navigationRef } from './app/navigation/NavigationServices';
import { PortalProvider } from './app/components';
import { persistor, store } from './app/redux/store';

function App() {
  const Wrapper = Platform.OS === 'android' ? SafeAreaView : View;

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={styles.safeArea}>
            <PortalProvider>
              <NavigationContainer ref={navigationRef}>
                <Wrapper style={styles.safeArea}>
                  <RootNavigator />
                </Wrapper>
              </NavigationContainer>
            </PortalProvider>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
