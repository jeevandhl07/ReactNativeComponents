import React, { forwardRef } from 'react';
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  type ScrollView,
} from 'react-native';
import {
  KeyboardAwareScrollView,
  type KeyboardAwareScrollViewProps,
  type KeyboardAwareScrollViewRef,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SPACING } from '../../constants';

type KeyboardAvoidFormProps = Omit<
  KeyboardAwareScrollViewProps,
  'contentContainerStyle'
> & {
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const KeyboardAvoidForm = forwardRef<
  KeyboardAwareScrollViewRef & ScrollView,
  KeyboardAvoidFormProps
>(
  (
    {
      children,
      bottomOffset = SPACING.xl,
      extraKeyboardSpace = SPACING.md,
      keyboardShouldPersistTaps = 'handled',
      mode = 'insets',
      showsVerticalScrollIndicator = false,
      style,
      contentContainerStyle,
      ...props
    },
    ref,
  ) => {
    const insets = useSafeAreaInsets();

    return (
      <KeyboardAwareScrollView
        ref={ref}
        bottomOffset={bottomOffset}
        extraKeyboardSpace={extraKeyboardSpace}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        mode={mode}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        style={[styles.container, style]}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + SPACING.xl },
          contentContainerStyle,
        ]}
        {...props}
      >
        {children}
      </KeyboardAwareScrollView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});

export default KeyboardAvoidForm;
