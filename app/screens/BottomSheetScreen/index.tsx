import React, { useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from '../../assets/icon';
import { AppHeader, BottomSheet, Container, Dropdown } from '../../components';
import { APP_THEMES, COLORS, moderateScale } from '../../constants';
import { styles } from './styles';

type DropdownKey = 'smallData' | 'largeData';

type DropdownConfig = {
  key: DropdownKey;
  label: string;
  placeholder: string;
  options: string[];
};

const dropdowns: DropdownConfig[] = [
  {
    key: 'smallData',
    label: 'Dropdown With 10 Data',
    placeholder: 'Select from 10 items',
    options: Array.from({ length: 10 }, (_, index) => `Option ${index + 1}`),
  },
  {
    key: 'largeData',
    label: 'Dropdown With 30 Data',
    placeholder: 'Select from 30 items',
    options: Array.from({ length: 30 }, (_, index) => `Data Item ${index + 1}`),
  },
];

const initialValues = dropdowns.reduce(
  (values, dropdown) => ({ ...values, [dropdown.key]: '' }),
  {} as Record<DropdownKey, string>,
);

const BottomSheetScreen = () => {
  const [selectedValues, setSelectedValues] = useState(initialValues);
  const [isInfoSheetVisible, setIsInfoSheetVisible] = useState(false);
  const [isFormSheetVisible, setIsFormSheetVisible] = useState(false);
  const [isFormAtTop, setIsFormAtTop] = useState(true);
  const theme = APP_THEMES.light;

  const handleSelect = (key: DropdownKey, value: string) => {
    setSelectedValues(currentValues => ({
      ...currentValues,
      [key]: value,
    }));
  };

  const handleFormScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const nextIsFormAtTop = event.nativeEvent.contentOffset.y <= 1;

    setIsFormAtTop(currentValue =>
      currentValue === nextIsFormAtTop ? currentValue : nextIsFormAtTop,
    );
  };

  return (
    <Container>
      <AppHeader title="Bottom Sheet" />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.demoCard, { borderColor: theme.border }]}>
          <Text style={[styles.demoTitle, { color: theme.ink }]}>
            Simple Bottom Sheet
          </Text>
          <Text style={[styles.demoText, { color: theme.muted }]}>
            Use it for quick actions, compact forms, filters, and extra details
            without leaving the current screen.
          </Text>
          <Pressable
            onPress={() => setIsInfoSheetVisible(true)}
            style={({ pressed }) => [
              styles.sheetButton,
              { backgroundColor: pressed ? COLORS.brandNavy : COLORS.primary },
            ]}
          >
            <Icon
              type="ion"
              name="albums-outline"
              size={moderateScale(18)}
              color={COLORS.white}
            />
            <Text style={styles.sheetButtonText}>Open Bottom Sheet</Text>
          </Pressable>
        </View>

        {dropdowns.map(dropdown => (
          <Dropdown
            key={dropdown.key}
            label={dropdown.label}
            options={dropdown.options}
            value={selectedValues[dropdown.key]}
            placeholder={dropdown.placeholder}
            onChange={value => handleSelect(dropdown.key, value)}
            style={styles.dropdownSpacing}
          />
        ))}

        <Pressable
          onPress={() => setIsFormSheetVisible(true)}
          style={({ pressed }) => [
            styles.formSheetButton,
            { backgroundColor: pressed ? COLORS.brandNavy : COLORS.primary },
          ]}
        >
          <Icon
            type="ion"
            name="reader-outline"
            size={moderateScale(18)}
            color={COLORS.white}
          />
          <Text style={styles.sheetButtonText}>Open Input Sheet</Text>
        </Pressable>
      </ScrollView>

      <BottomSheet
        visible={isInfoSheetVisible}
        onClose={() => setIsInfoSheetVisible(false)}
        maxHeight={moderateScale(360)}
      >
        <View style={styles.infoSheetContent}>
          <View style={[styles.infoIcon, { backgroundColor: theme.token }]}>
            <Icon
              type="ion"
              name="layers-outline"
              size={moderateScale(24)}
              color={theme.accent}
            />
          </View>
          <Text style={[styles.infoTitle, { color: theme.ink }]}>
            Bottom sheet is for focused choices
          </Text>
          <Text style={[styles.infoText, { color: theme.muted }]}>
            It keeps users in context while showing a short task, picker, menu,
            or confirmation near the bottom of the screen.
          </Text>
          <Pressable
            onPress={() => setIsInfoSheetVisible(false)}
            style={({ pressed }) => [
              styles.doneButton,
              { backgroundColor: pressed ? COLORS.brandNavy : COLORS.primary },
            ]}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </Pressable>
        </View>
      </BottomSheet>

      <BottomSheet
        visible={isFormSheetVisible}
        onClose={() => setIsFormSheetVisible(false)}
        onDismiss={() => setIsFormAtTop(true)}
        enableContentDrag
        canDragContent={isFormAtTop}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          onScroll={handleFormScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {Array.from({ length: 10 }, (_, index) => (
            <View key={`input-${index + 1}`} style={styles.formField}>
              <Text style={[styles.formLabel, { color: theme.ink }]}>
                Input field {index + 1}
              </Text>
              <TextInput
                placeholder={`Enter input field ${index + 1}`}
                placeholderTextColor={theme.subtle}
                selectionColor={theme.accent}
                style={[
                  styles.formInput,
                  {
                    borderColor: theme.border,
                    color: theme.ink,
                    backgroundColor: theme.token,
                  },
                ]}
              />
            </View>
          ))}
        </ScrollView>

        <Pressable
          onPress={() => setIsFormSheetVisible(false)}
          style={({ pressed }) => [
            styles.doneButton,
            { backgroundColor: pressed ? COLORS.brandNavy : COLORS.primary },
          ]}
        >
          <Text style={styles.doneButtonText}>Submit</Text>
        </Pressable>
      </BottomSheet>
    </Container>
  );
};

export default BottomSheetScreen;
