import React from 'react';
import AppButton from './AppButton';
import { NumberedButtonProps } from './types';

type Button6Props = NumberedButtonProps<'size'>;

const Button6 = ({ title = 'Small Button', ...props }: Button6Props) => (
  <AppButton title={title} size="sm" {...props} />
);

export default Button6;
