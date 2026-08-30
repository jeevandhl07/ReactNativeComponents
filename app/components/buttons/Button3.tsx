import React from 'react';
import AppButton from './AppButton';
import { NumberedButtonProps } from './types';

type Button3Props = NumberedButtonProps<'variant'>;

const Button3 = ({ title = 'Outline Button', ...props }: Button3Props) => (
  <AppButton title={title} variant="outline" {...props} />
);

export default Button3;
