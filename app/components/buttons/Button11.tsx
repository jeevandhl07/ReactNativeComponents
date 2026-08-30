import React from 'react';
import AppButton from './AppButton';
import { NumberedButtonProps } from './types';

type Button11Props = NumberedButtonProps<'leftLabel'>;

const Button11 = ({ title = 'Create Component', ...props }: Button11Props) => (
  <AppButton title={title} leftLabel="+" {...props} />
);

export default Button11;
