import React, { useMemo, useState } from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  View,
  ViewStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
  Platform,
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

type DropdownProps = {
  label: string;
  options: string[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

const Dropdown = ({
  label,
  options,
  value,
  placeholder = 'Select option',
  onChange,
  style,
}: DropdownProps) => {
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [isListAtTop, setIsListAtTop] = useState(true);
  const [query, setQuery] = useState('');
  const { height: windowHeight } = useWindowDimensions();
  const theme = APP_THEMES.light;
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

  const sheetHeightLimit = safeAvailableHeight * 0.8;
  const searchAndSpacingHeight = verticalScale(74);
  const optionListHeight = Math.min(
    options.length * verticalScale(52),
    Math.max(sheetHeightLimit - searchAndSpacingHeight, verticalScale(120)),
  );
  const sheetMaxHeight = Math.min(
    optionListHeight + searchAndSpacingHeight,
    sheetHeightLimit,
  );

  const closeSheet = () => {
    setIsSheetVisible(false);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIsListAtTop = event.nativeEvent.contentOffset.y <= 1;

    setIsListAtTop(currentValue =>
      currentValue === nextIsListAtTop ? currentValue : nextIsListAtTop,
    );
  };

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    Keyboard.dismiss();
    closeSheet();
  };

  return (
    <>
      <View style={style}>
        <Text style={[styles.fieldLabel, { color: theme.ink }]}>{label}</Text>
        <Pressable
          onPress={() => setIsSheetVisible(true)}
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
              { color: value ? COLORS.textSoft : theme.subtle },
            ]}
            numberOfLines={1}
          >
            {value || placeholder}
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
          {filteredOptions.map(option => (
            <Pressable
              key={option}
              onPress={() => handleSelect(option)}
              style={({ pressed }) => [
                styles.option,
                {
                  backgroundColor: pressed ? theme.token : theme.surface,
                  borderColor: theme.border,
                },
              ]}
            >
              <Text style={[styles.optionTitle, { color: theme.ink }]}>
                {option}
              </Text>
              <Text style={[styles.optionSubtitle, { color: theme.muted }]}>
                {label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {filteredOptions.length === 0 ? (
          <View style={styles.emptyOptions}>
            <Text style={[styles.emptyText, { color: theme.muted }]}>
              No matching options
            </Text>
          </View>
        ) : null}
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
    borderBottomWidth: 1,
    justifyContent: 'center',
    minHeight: verticalScale(52),
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
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
  emptyOptions: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: verticalScale(80),
  },
  emptyText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(14),
  },
});

export default Dropdown;
