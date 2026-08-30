import React from 'react';
import AppButton from './AppButton';
import { NumberedButtonProps } from './types';

type Button12Props = NumberedButtonProps<'leftLabel' | 'variant'>;

const Button12 = ({ title = 'Publish Component', ...props }: Button12Props) => (
  <AppButton title={title} variant="secondary" leftLabel="P" {...props} />
);

export default Button12;
