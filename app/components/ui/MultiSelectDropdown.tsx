import React, { useMemo, useState } from 'react';
import {
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import Icon from '../../assets/icon';
import {
  APP_THEMES,
  BORDER_RADIUS,
  COLORS,
  FONT_FAMILY,
  moderateScale,
  SPACING,
  verticalScale,
} from '../../constants';
import BottomSheet from './BottomSheet';

type MultiSelectDropdownProps = {
  label: string;
  options: string[];
  values?: string[];
  placeholder?: string;
  onChange: (values: string[]) => void;
  style?: StyleProp<ViewStyle>;
};

const MultiSelectDropdown = ({
  label,
  options,
  values = [],
  placeholder = 'Select options',
  onChange,
  style,
}: MultiSelectDropdownProps) => {
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [isListAtTop, setIsListAtTop] = useState(true);
  const [pendingValues, setPendingValues] = useState(values);
  const [query, setQuery] = useState('');
  const { height: windowHeight } = useWindowDimensions();
  const theme = APP_THEMES.light;
  const selectedValues = useMemo(() => new Set(pendingValues), [pendingValues]);
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;
  const safeAvailableHeight = windowHeight - statusBarHeight - SPACING.xl;

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return options;
    }

    return options.filter(option =>
      option.toLowerCase().includes(normalizedQuery),
    );
  }, [options, query]);

  const displayValue = useMemo(() => {
    if (values.length === 0) {
      return placeholder;
    }

    if (values.length <= 2) {
      return values.join(', ');
    }

    return `${values.length} selected`;
  }, [placeholder, values]);

  const sheetHeightLimit = safeAvailableHeight * 0.8;
  const searchAndActionsHeight = verticalScale(132);
  const optionListHeight = Math.min(
    options.length * verticalScale(56),
    Math.max(sheetHeightLimit - searchAndActionsHeight, verticalScale(120)),
  );
  const sheetMaxHeight = Math.min(
    optionListHeight + searchAndActionsHeight,
    sheetHeightLimit,
  );

  const closeSheet = () => {
    setIsSheetVisible(false);
  };

  const openSheet = () => {
    setPendingValues(values);
    setIsSheetVisible(true);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIsListAtTop = event.nativeEvent.contentOffset.y <= 1;

    setIsListAtTop(currentValue =>
      currentValue === nextIsListAtTop ? currentValue : nextIsListAtTop,
    );
  };

  const handleToggle = (option: string) => {
    const nextValues = selectedValues.has(option)
      ? pendingValues.filter(value => value !== option)
      : [...pendingValues, option];

    setPendingValues(nextValues);
  };

  const handleClear = () => {
    onChange([]);
    Keyboard.dismiss();
    closeSheet();
  };

  const handleDone = () => {
    onChange(pendingValues);
    Keyboard.dismiss();
    closeSheet();
  };

  return (
    <>
      <View style={style}>
        <Text style={[styles.fieldLabel, { color: theme.ink }]}>{label}</Text>
        <Pressable
          onPress={openSheet}
          style={({ pressed }) => [
            styles.field,
            {
              borderColor: COLORS.inputStroke,
              backgroundColor: pressed ? theme.token : theme.surface,
            },
          ]}
        >
          <Text
            style={[
              styles.fieldValue,
              { color: values.length > 0 ? COLORS.textSoft : theme.subtle },
            ]}
            numberOfLines={1}
          >
            {displayValue}
          </Text>

          <Icon
            type="ion"
            name="chevron-forward"
            size={moderateScale(18)}
            color={theme.subtle}
          />
        </Pressable>
      </View>

      <BottomSheet
        visible={isSheetVisible}
        onClose={closeSheet}
        onDismiss={() => {
          setIsListAtTop(true);
          setQuery('');
        }}
        maxHeight={sheetMaxHeight}
        enableContentDrag
        canDragContent={isListAtTop}
      >
        <View
          style={[
            styles.searchBox,
            { borderColor: theme.border, backgroundColor: theme.token },
          ]}
        >
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search hatchery"
            placeholderTextColor={theme.subtle}
            selectionColor={theme.accent}
            style={[styles.searchInput, { color: theme.ink }]}
          />
          <Icon
            type="ion"
            name="search-outline"
            size={moderateScale(16)}
            color={theme.subtle}
          />
        </View>

        <ScrollView
          style={{ maxHeight: optionListHeight }}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {filteredOptions.map(option => {
            const isSelected = selectedValues.has(option);

            return (
              <Pressable
                key={option}
                onPress={() => handleToggle(option)}
                style={({ pressed }) => [
                  styles.option,
                  {
                    backgroundColor: pressed ? theme.token : theme.surface,
                    borderColor: theme.border,
                  },
                ]}
              >
                <View style={styles.optionCopy}>
                  <Text style={[styles.optionTitle, { color: theme.ink }]}>
                    {option}
                  </Text>
                  <Text style={[styles.optionSubtitle, { color: theme.muted }]}>
                    {label}
                  </Text>
                </View>

                <View
                  style={[
                    styles.checkCircle,
                    {
                      borderColor: isSelected
                        ? COLORS.success
                        : COLORS.inputStroke,
                      backgroundColor: isSelected
                        ? COLORS.success
                        : theme.surface,
                    },
                  ]}
                >
                  {isSelected ? (
                    <Icon
                      type="ion"
                      name="checkmark"
                      size={moderateScale(14)}
                      color={COLORS.white}
                    />
                  ) : null}
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        {filteredOptions.length === 0 ? (
          <View style={styles.emptyOptions}>
            <Text style={[styles.emptyText, { color: theme.muted }]}>
              No matching options
            </Text>
          </View>
        ) : null}

        <View style={styles.actions}>
          <Pressable
            onPress={handleClear}
            style={({ pressed }) => [
              styles.clearButton,
              {
                borderColor: theme.border,
                backgroundColor: pressed ? theme.token : theme.surface,
              },
            ]}
          >
            <Text style={[styles.clearText, { color: theme.muted }]}>
              Clear
            </Text>
          </Pressable>
          <Pressable
            onPress={handleDone}
            style={({ pressed }) => [
              styles.doneButton,
              { backgroundColor: pressed ? COLORS.brandNavy : COLORS.primary },
            ]}
          >
            <Text style={styles.doneText}>Done</Text>
          </Pressable>
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  field: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: verticalScale(46),
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  fieldLabel: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: moderateScale(15),
    marginBottom: verticalScale(7),
  },
  fieldValue: {
    flex: 1,
    fontFamily: FONT_FAMILY.medium,
    fontSize: moderateScale(13),
    marginRight: SPACING.sm,
  },
  searchBox: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    flexDirection: 'row',
    height: verticalScale(46),
    marginVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(12),
    height: verticalScale(34),
    padding: 0,
  },
  option: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: verticalScale(56),
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  optionCopy: {
    flex: 1,
    minWidth: 0,
  },
  optionTitle: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: moderateScale(16),
  },
  optionSubtitle: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(12),
    marginTop: verticalScale(2),
  },
  checkCircle: {
    alignItems: 'center',
    borderRadius: moderateScale(999),
    borderWidth: 1,
    height: moderateScale(22),
    justifyContent: 'center',
    marginLeft: SPACING.md,
    width: moderateScale(22),
  },
  emptyOptions: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: verticalScale(80),
  },
  emptyText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(14),
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    paddingTop: SPACING.md,
  },
  clearButton: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    minHeight: verticalScale(44),
  },
  clearText: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: moderateScale(14),
  },
  doneButton: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
    flex: 1,
    justifyContent: 'center',
    minHeight: verticalScale(44),
  },
  doneText: {
    color: COLORS.white,
    fontFamily: FONT_FAMILY.medium,
    fontSize: moderateScale(14),
  },
});

export default MultiSelectDropdown;
