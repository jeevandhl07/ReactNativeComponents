import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Icon from '../../assets/icon';
import { AppHeader, Container, Toast, ToastVariant } from '../../components';
import { APP_THEMES, COLORS, moderateScale } from '../../constants';
import { styles } from './styles';

type ToastExample = {
  variant: ToastVariant;
  title: string;
  message: string;
  icon: string;
};

const toastExamples: ToastExample[] = [
  {
    variant: 'success',
    title: 'Success',
    message: 'Your changes were saved successfully.',
    icon: 'checkmark-circle-outline',
  },
  {
    variant: 'error',
    title: 'Error',
    message: 'Something went wrong. Please try again.',
    icon: 'alert-circle-outline',
  },
  {
    variant: 'warning',
    title: 'Warning',
    message: 'Review the form before continuing.',
    icon: 'warning-outline',
  },
  {
    variant: 'info',
    title: 'Info',
    message: 'A new update is available for this component.',
    icon: 'information-circle-outline',
  },
];

const ToastScreen = () => {
  const [activeToast, setActiveToast] = useState<ToastExample | null>(null);
  const theme = APP_THEMES.light;

  return (
    <Container>
      <AppHeader title="Toast" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.previewCard, { borderColor: theme.border }]}>
          <Text style={[styles.previewKicker, { color: theme.accent }]}>
            TOAST PREVIEW
          </Text>
          <Text style={[styles.previewTitle, { color: theme.ink }]}>
            Short feedback messages for completed actions.
          </Text>
          <Text style={[styles.previewText, { color: theme.muted }]}>
            Trigger a toast for success, error, warning, or info states.
          </Text>
        </View>

        {toastExamples.map(example => (
          <Pressable
            key={example.variant}
            onPress={() => setActiveToast(example)}
            style={({ pressed }) => [
              styles.option,
              {
                backgroundColor: pressed ? theme.token : theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={styles.optionLeft}>
              <Icon
                type="ion"
                name={example.icon}
                size={moderateScale(22)}
                color={COLORS.primary}
              />
              <View style={styles.optionCopy}>
                <Text style={[styles.optionTitle, { color: theme.ink }]}>
                  {example.title} Toast
                </Text>
                <Text style={[styles.optionText, { color: theme.muted }]}>
                  {example.message}
                </Text>
              </View>
            </View>
            <Icon
              type="ion"
              name="chevron-forward"
              size={moderateScale(18)}
              color={theme.subtle}
            />
          </Pressable>
        ))}
      </ScrollView>

      {activeToast ? (
        <Toast
          visible
          variant={activeToast.variant}
          title={activeToast.title}
          message={activeToast.message}
          onHide={() => setActiveToast(null)}
        />
      ) : null}
    </Container>
  );
};

export default ToastScreen;
