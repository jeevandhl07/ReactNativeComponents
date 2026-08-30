import React from 'react';
import AppButton from './AppButton';
import { NumberedButtonProps } from './types';

type Button7Props = NumberedButtonProps<'size'>;

const Button7 = ({ title = 'Large Button', ...props }: Button7Props) => (
  <AppButton title={title} size="lg" {...props} />
);

export default Button7;
