import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../../constants';
import { styles } from './styles';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

type AppButtonProps = Omit<PressableProps, 'style'> & {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftLabel?: string;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

const AppButton = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftLabel,
  fullWidth = false,
  disabled,
  style,
  ...props
}: AppButtonProps) => {
  const isDisabled = disabled || loading;
  const variantStyle = getVariantStyle(variant, isDisabled);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        styles[size],
        fullWidth && styles.fullWidth,
        {
          backgroundColor: variantStyle.background,
          borderColor: variantStyle.border,
          opacity: pressed && !isDisabled ? 0.84 : 1,
        },
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variantStyle.text} size="small" />
      ) : null}
      {!loading && leftLabel ? (
        <View style={[styles.leftLabel, { borderColor: variantStyle.text }]}>
          <Text style={[styles.leftLabelText, { color: variantStyle.text }]}>
            {leftLabel}
          </Text>
        </View>
      ) : null}
      <Text style={[styles.title, styles[`${size}Title`], { color: variantStyle.text }]}>
        {title}
      </Text>
    </Pressable>
  );
};

const getVariantStyle = (variant: ButtonVariant, disabled?: boolean) => {
  if (disabled) {
    return {
      background: COLORS.disabled,
      border: COLORS.disabled,
      text: COLORS.white,
    };
  }

  switch (variant) {
    case 'secondary':
      return {
        background: COLORS.secondary,
        border: COLORS.secondary,
        text: COLORS.primary,
      };
    case 'outline':
      return {
        background: COLORS.white,
        border: COLORS.primary,
        text: COLORS.primary,
      };
    case 'ghost':
      return {
        background: 'transparent',
        border: 'transparent',
        text: COLORS.primary,
      };
    case 'danger':
      return {
        background: COLORS.danger,
        border: COLORS.danger,
        text: COLORS.white,
      };
    default:
      return {
        background: COLORS.primary,
        border: COLORS.primary,
        text: COLORS.white,
      };
  }
};

export default AppButton;
