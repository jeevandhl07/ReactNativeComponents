import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppHeader, Container, Dropdown } from '../../components';
import { APP_THEMES } from '../../constants';
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
  const theme = APP_THEMES.light;

  const handleSelect = (key: DropdownKey, value: string) => {
    setSelectedValues(currentValues => ({
      ...currentValues,
      [key]: value,
    }));
  };

  return (
    <Container>
      <AppHeader title="Bottom Sheet" />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.preview, { borderColor: theme.border }]}>
          <Text style={[styles.eyebrow, { color: theme.accent }]}>
            Dropdown Sheet Preview
          </Text>
          <Text style={[styles.title, { color: theme.ink }]}>
            Two dropdowns using one Bottom Sheet.
          </Text>
          <Text style={[styles.description, { color: theme.muted }]}>
            One dropdown has 10 options and the other has 30 options, both with
            a searchable input inside the sheet.
          </Text>
        </View>

        <View style={styles.dropdownList}>
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
        </View>
      </ScrollView>
    </Container>
  );
};

export default BottomSheetScreen;
