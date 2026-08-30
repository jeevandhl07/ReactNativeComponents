import React from 'react';
import AppButton from './AppButton';
import { NumberedButtonProps } from './types';

type Button5Props = NumberedButtonProps<'variant'>;

const Button5 = ({ title = 'Danger Button', ...props }: Button5Props) => (
  <AppButton title={title} variant="danger" {...props} />
);

export default Button5;
