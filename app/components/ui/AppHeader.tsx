import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  COLORS,
  Fonts,
  SPACING,
  moderateScale,
  verticalScale,
} from '../../constants';

type AppHeaderProps = {
  title?: string;
  rightIcon?: string;
  filterIcon?: string;
  onFilterPress?: () => void;
  onRightPress?: () => void;
  showFilterButton?: boolean;
  showBackButton?: boolean;
  showRightButton?: boolean;
};

const AppHeader = ({
  title,
  rightIcon = 'add',
  filterIcon = 'filter-outline',
  onFilterPress,
  onRightPress,
  showFilterButton = false,
  showBackButton = true,
  showRightButton = false,
}: AppHeaderProps) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.content}>
      {showBackButton ? (
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={handleBackPress}
          style={styles.backButton}
        >
          <Text style={styles.iconText}>{'<'}</Text>
        </TouchableOpacity>
      ) : null}

      <View style={styles.copy}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {showRightButton ? (
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={onRightPress}
          style={styles.actionButton}
        >
          <Text style={styles.iconText}>{getIconLabel(rightIcon)}</Text>
        </TouchableOpacity>
      ) : null}

      {showFilterButton ? (
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={onFilterPress}
          style={[styles.actionButton, showRightButton && styles.filterButton]}
        >
          <Text style={styles.iconText}>{getIconLabel(filterIcon)}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const getIconLabel = (iconName?: string) => {
  if (iconName === 'add') {
    return '+';
  }

  if (iconName?.includes('filter')) {
    return 'F';
  }

  return '+';
};

const styles = StyleSheet.create({
  content: {
    minHeight: verticalScale(66),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.white,
  },
  backButton: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(38),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(8),
    elevation: 3,
  },
  copy: {
    flex: 1,
    minWidth: 0,
    marginLeft: SPACING.sm,
    marginRight: SPACING.md,
  },
  title: {
    color: COLORS.dark,
    fontSize: moderateScale(20),
    fontFamily: Fonts.bold,
  },
  iconText: {
    color: COLORS.dark,
    fontFamily: Fonts.extraBold,
    fontSize: moderateScale(20),
    lineHeight: moderateScale(22),
  },
  actionButton: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderWidth: 1,
    borderColor: COLORS.stroke,
    borderRadius: moderateScale(38),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  filterButton: {
    marginLeft: SPACING.sm,
  },
});

export default AppHeader;
