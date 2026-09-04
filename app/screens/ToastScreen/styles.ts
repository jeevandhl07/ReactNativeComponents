import { StyleSheet } from 'react-native';
import {
  BORDER_RADIUS,
  FONT_FAMILY,
  SPACING,
  moderateScale,
  verticalScale,
} from '../../constants';

export const styles = StyleSheet.create({
  content: {
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.md,
  },
  previewCard: {
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    marginBottom: SPACING.lg,
    padding: SPACING.md,
  },
  previewKicker: {
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(12),
    marginBottom: SPACING.sm,
  },
  previewTitle: {
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(24),
    lineHeight: moderateScale(31),
  },
  previewText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(15),
    lineHeight: moderateScale(22),
    marginTop: SPACING.sm,
  },
  option: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm + verticalScale(4),
    minHeight: verticalScale(72),
    padding: SPACING.md,
  },
  optionLeft: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    minWidth: 0,
  },
  optionCopy: {
    flex: 1,
    marginLeft: SPACING.sm,
    minWidth: 0,
  },
  optionTitle: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: moderateScale(16),
  },
  optionText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(13),
    lineHeight: moderateScale(19),
    marginTop: verticalScale(2),
  },
});
