import * as React from 'react';
import {
  NavigationContainerRef,
  ParamListBase,
} from '@react-navigation/native';

export const navigationRef =
  React.createRef<NavigationContainerRef<ParamListBase>>();

export function navigate(name: string, params?: object) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}
