import React from 'react';
import AppButton from './AppButton';
import { NumberedButtonProps } from './types';

type Button2Props = NumberedButtonProps<'variant'>;

const Button2 = ({ title = 'Secondary Button', ...props }: Button2Props) => (
  <AppButton title={title} variant="secondary" {...props} />
);

export default Button2;
