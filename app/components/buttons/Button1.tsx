import React from 'react';
import AppButton from './AppButton';
import { NumberedButtonProps } from './types';

type Button1Props = NumberedButtonProps<'variant'>;

const Button1 = ({ title = 'Primary Button', ...props }: Button1Props) => (
  <AppButton title={title} variant="primary" {...props} />
);

export default Button1;
