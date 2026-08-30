import React from 'react';
import AppButton from './AppButton';
import { NumberedButtonProps } from './types';

type Button9Props = NumberedButtonProps<'disabled'>;

const Button9 = ({ title = 'Disabled Button', ...props }: Button9Props) => (
  <AppButton title={title} disabled {...props} />
);

export default Button9;
