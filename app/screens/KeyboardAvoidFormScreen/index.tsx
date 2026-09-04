import React, { useMemo, useRef, useState } from 'react';
import {
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import Icon from '../../assets/icon';
import {
  AppHeader,
  Container,
  KeyboardAvoidForm,
  Toast,
} from '../../components';
import { COLORS, moderateScale } from '../../constants';
import { styles } from './styles';

type Field = {
  key: string;
  label: string;
  placeholder: string;
  keyboardType?: TextInputProps['keyboardType'];
  multiline?: boolean;
};

const fields: Field[] = [
  { key: 'name', label: 'Full Name', placeholder: 'Enter full name' },
  {
    key: 'email',
    label: 'Email Address',
    placeholder: 'Enter email address',
    keyboardType: 'email-address',
  },
  {
    key: 'phone',
    label: 'Phone Number',
    placeholder: 'Enter phone number',
    keyboardType: 'phone-pad',
  },
  { key: 'farm', label: 'Farm Name', placeholder: 'Enter farm name' },
  { key: 'district', label: 'District', placeholder: 'Enter district' },
  { key: 'city', label: 'City', placeholder: 'Enter city' },
  { key: 'ward', label: 'Ward Number', placeholder: 'Enter ward number' },
  { key: 'street', label: 'Street', placeholder: 'Enter street name' },
  { key: 'house', label: 'House Number', placeholder: 'Enter house number' },
  {
    key: 'notes',
    label: 'Notes',
    placeholder: 'Write short notes',
    multiline: true,
  },
];

const KeyboardAvoidFormScreen = () => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);
  const inputs = useRef<Array<TextInput | null>>([]);

  const completedFields = useMemo(
    () => fields.filter(field => values[field.key]?.trim()).length,
    [values],
  );

  const handleSubmit = () => {
    Keyboard.dismiss();
    setShowToast(true);
  };

  return (
    <Container>
      <AppHeader title="Keyboard Form" />

      <KeyboardAvoidForm contentContainerStyle={styles.content}>
        <View style={styles.previewCard}>
          <View style={styles.previewIcon}>
            <Icon
              type="ion"
              name="keypad-outline"
              size={moderateScale(22)}
              color={COLORS.primary}
            />
          </View>
          <Text style={styles.previewKicker}>KEYBOARD PREVIEW</Text>
          <Text style={styles.previewTitle}>
            Smooth form that avoids the keyboard.
          </Text>
          <Text style={styles.previewText}>
            Inputs stay visible while typing on iOS and Android.
          </Text>
        </View>

        <View style={styles.progressRow}>
          <Text style={styles.progressTitle}>Form Details</Text>
          <Text style={styles.progressMeta}>
            {completedFields} of {fields.length}
          </Text>
        </View>

        {fields.map((field, index) => (
          <View key={field.key} style={styles.fieldGroup}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              ref={input => {
                inputs.current[index] = input;
              }}
              value={values[field.key] ?? ''}
              onChangeText={text =>
                setValues(currentValues => ({
                  ...currentValues,
                  [field.key]: text,
                }))
              }
              placeholder={field.placeholder}
              placeholderTextColor={COLORS.disabled}
              keyboardType={field.keyboardType}
              multiline={field.multiline}
              inputAccessoryViewID={
                field.keyboardType === 'phone-pad' ? 'none' : undefined
              }
              blurOnSubmit={
                field.keyboardType === 'phone-pad' ||
                index === fields.length - 1
              }
              onSubmitEditing={() => {
                if (field.keyboardType === 'phone-pad') {
                  return;
                }

                if (index === fields.length - 1) {
                  handleSubmit();
                  return;
                }

                inputs.current[index + 1]?.focus();
              }}
              style={[styles.input, field.multiline && styles.textArea]}
              textAlignVertical={field.multiline ? 'top' : 'center'}
            />
          </View>
        ))}

        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.submitButton,
            pressed && styles.submitButtonPressed,
          ]}
        >
          <Text style={styles.submitText}>Submit Form</Text>
          <Icon
            type="ion"
            name="checkmark-circle"
            size={moderateScale(20)}
            color={COLORS.white}
          />
        </Pressable>
      </KeyboardAvoidForm>

      <Toast
        visible={showToast}
        variant="success"
        title="Form Ready"
        message="Keyboard avoiding form submitted."
        onHide={() => setShowToast(false)}
      />
    </Container>
  );
};

export default KeyboardAvoidFormScreen;
