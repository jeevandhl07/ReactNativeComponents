import React from 'react';
import AppButton from './AppButton';
import { NumberedButtonProps } from './types';

type Button10Props = NumberedButtonProps<'fullWidth'>;

const Button10 = ({ title = 'Full Width Button', ...props }: Button10Props) => (
  <AppButton title={title} fullWidth {...props} />
);

export default Button10;
