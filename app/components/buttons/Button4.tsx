import React from 'react';
import AppButton from './AppButton';
import { NumberedButtonProps } from './types';

type Button4Props = NumberedButtonProps<'variant'>;

const Button4 = ({ title = 'Ghost Button', ...props }: Button4Props) => (
  <AppButton title={title} variant="ghost" {...props} />
);

export default Button4;
