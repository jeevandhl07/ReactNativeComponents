import { StyleSheet } from 'react-native';
import {
  BORDER_RADIUS,
  COLORS,
  FONT_FAMILY,
  SPACING,
  moderateScale,
  verticalScale,
} from '../../constants';

export const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  previewCard: {
    borderColor: COLORS.stroke,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    marginBottom: SPACING.lg,
    padding: SPACING.md,
  },
  previewIcon: {
    alignItems: 'center',
    backgroundColor: COLORS.iconBg,
    borderRadius: BORDER_RADIUS.md,
    height: moderateScale(42),
    justifyContent: 'center',
    marginBottom: SPACING.md,
    width: moderateScale(42),
  },
  previewKicker: {
    color: COLORS.primary,
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(12),
    marginBottom: SPACING.sm,
  },
  previewTitle: {
    color: COLORS.ink,
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(24),
    lineHeight: moderateScale(31),
  },
  previewText: {
    color: COLORS.inkMuted,
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(15),
    lineHeight: moderateScale(22),
    marginTop: SPACING.sm,
  },
  progressRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  progressTitle: {
    color: COLORS.ink,
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(19),
  },
  progressMeta: {
    color: COLORS.inkMuted,
    fontFamily: FONT_FAMILY.bold,
    fontSize: moderateScale(13),
  },
  fieldGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    color: COLORS.ink,
    fontFamily: FONT_FAMILY.bold,
    fontSize: moderateScale(14),
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.inputStroke,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    color: COLORS.ink,
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(15),
    minHeight: verticalScale(50),
    paddingHorizontal: SPACING.md,
    paddingVertical: 0,
  },
  textArea: {
    minHeight: verticalScale(96),
    paddingTop: SPACING.md,
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    flexDirection: 'row',
    gap: SPACING.sm,
    height: verticalScale(52),
    justifyContent: 'center',
    marginTop: SPACING.sm,
  },
  submitButtonPressed: {
    opacity: 0.82,
  },
  submitText: {
    color: COLORS.white,
    fontFamily: FONT_FAMILY.bold,
    fontSize: moderateScale(15),
  },
});
