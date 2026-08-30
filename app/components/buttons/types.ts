import { ComponentProps } from 'react';
import AppButton from './AppButton';

export type NumberedButtonProps<TExcluded extends keyof AppButtonProps> = Omit<
  AppButtonProps,
  TExcluded | 'title'
> & {
  title?: string;
};

type AppButtonProps = ComponentProps<typeof AppButton>;
