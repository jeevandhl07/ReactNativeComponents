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
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.md,
  },
  demoCard: {
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    marginBottom: SPACING.lg,
    padding: SPACING.md,
  },
  demoTitle: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: moderateScale(18),
  },
  demoText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(21),
    marginTop: SPACING.xs,
  },
  sheetButton: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.md,
    minHeight: verticalScale(46),
  },
  sheetButtonText: {
    color: COLORS.white,
    fontFamily: FONT_FAMILY.medium,
    fontSize: moderateScale(14),
    marginLeft: SPACING.sm,
  },
  dropdownSpacing: {
    marginBottom: SPACING.sm + verticalScale(4),
  },
  formSheetButton: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.sm,
    minHeight: verticalScale(46),
  },
  infoSheetContent: {
    alignItems: 'center',
    paddingBottom: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  infoIcon: {
    alignItems: 'center',
    borderRadius: moderateScale(999),
    height: verticalScale(56),
    justifyContent: 'center',
    marginTop: SPACING.xs,
    width: verticalScale(56),
  },
  infoTitle: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: moderateScale(20),
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  infoText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(22),
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  doneButton: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    marginTop: SPACING.lg,
    minHeight: verticalScale(46),
    width: '100%',
  },
  doneButtonText: {
    color: COLORS.white,
    fontFamily: FONT_FAMILY.medium,
    fontSize: moderateScale(14),
  },
  formField: {
    marginBottom: SPACING.sm,
  },
  formLabel: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: moderateScale(14),
    marginBottom: SPACING.xs,
  },
  formInput: {
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(14),
    minHeight: verticalScale(46),
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
});
