import React from 'react';
import AppButton from './AppButton';
import { NumberedButtonProps } from './types';

type Button8Props = NumberedButtonProps<'loading'>;

const Button8 = ({ title = 'Loading Button', ...props }: Button8Props) => (
  <AppButton title={title} loading {...props} />
);

export default Button8;
