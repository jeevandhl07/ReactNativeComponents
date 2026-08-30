/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn(),
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
