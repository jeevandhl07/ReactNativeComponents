import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';

type IconType = 'ion' | 'evil' | 'feather' | 'material' | 'entypo' | 'fontisto';

interface IconProps {
  type: IconType;
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

const Icon: React.FC<IconProps> = ({
  type,
  name,
  size = 20,
  color = '#000',
  style,
}) => {
  const getIconComponent = () => {
    switch (type) {
      case 'ion':
        return Ionicons;
      case 'evil':
        return EvilIcons;
      case 'feather':
        return Feather;
      case 'material':
        return MaterialIcons;
      case 'entypo':
        return Entypo;
      case 'fontisto':
        return Fontisto;
      default:
        return Ionicons;
    }
  };

  const IconComponent = getIconComponent();
  return <IconComponent name={name} size={size} color={color} style={style} />;
};

export default Icon;
