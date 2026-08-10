declare module 'react-native-vector-icons/Ionicons';
declare module 'react-native-vector-icons/EvilIcons';
declare module 'react-native-vector-icons/Feather';
declare module 'react-native-vector-icons/MaterialIcons';
declare module 'react-native-vector-icons/Entypo';
declare module 'react-native-vector-icons/Fontisto';

declare module '*.svg' {
  import * as React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
