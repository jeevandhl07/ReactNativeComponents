/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn(),
}));

jest.mock(
  '@react-native-async-storage/async-storage',
  () => {
    let store: Record<string, string> = {};

    return {
      getItem: jest.fn((key: string) => Promise.resolve(store[key] ?? null)),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
        return Promise.resolve();
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
        return Promise.resolve();
      }),
      getAllKeys: jest.fn(() => Promise.resolve(Object.keys(store))),
      multiGet: jest.fn((keys: string[]) =>
        Promise.resolve(keys.map(key => [key, store[key] ?? null])),
      ),
      multiSet: jest.fn((pairs: [string, string][]) => {
        pairs.forEach(([key, value]) => {
          store[key] = value;
        });
        return Promise.resolve();
      }),
      multiRemove: jest.fn((keys: string[]) => {
        keys.forEach(key => {
          delete store[key];
        });
        return Promise.resolve();
      }),
      clear: jest.fn(() => {
        store = {};
        return Promise.resolve();
      }),
    };
  },
);

jest.mock('redux-persist', () => ({
  persistReducer: (_config: unknown, reducer: unknown) => reducer,
  persistStore: jest.fn(() => ({
    flush: jest.fn(() => Promise.resolve()),
    pause: jest.fn(),
    persist: jest.fn(),
    purge: jest.fn(() => Promise.resolve()),
  })),
}));

jest.mock('redux-persist/integration/react', () => ({
  PersistGate: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: React.ReactNode }) =>
    children,
  createNavigationContainerRef: jest.fn(() => ({
    isReady: jest.fn(() => false),
  })),
}));

jest.mock('../app/navigation/RootNavigator', () => {
  const ReactForMock = require('react');
  const { View } = require('react-native');

  return () => ReactForMock.createElement(View);
});

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
