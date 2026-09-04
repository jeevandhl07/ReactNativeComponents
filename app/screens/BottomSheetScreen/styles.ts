import { StyleSheet } from 'react-native';
import {
  BORDER_RADIUS,
  FONT_FAMILY,
  moderateScale,
  SPACING,
  verticalScale,
} from '../../constants';

export const styles = StyleSheet.create({
  content: {
    paddingBottom: SPACING.xl,
    padding: SPACING.md,
  },
  preview: {
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    padding: SPACING.md,
  },
  eyebrow: {
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(12),
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(24),
    lineHeight: moderateScale(31),
  },
  description: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(15),
    lineHeight: moderateScale(22),
    marginTop: SPACING.sm,
  },
  dropdownList: {
    marginTop: SPACING.md,
  },
  dropdownSpacing: {
    marginBottom: SPACING.sm + verticalScale(4),
  },
});
