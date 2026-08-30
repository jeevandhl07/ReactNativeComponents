import { StyleSheet } from 'react-native';
import {
  COLORS,
  FONT_FAMILY,
  moderateScale,
  SPACING,
  verticalScale,
} from '../../constants';

export const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SPACING.md + moderateScale(4),
    paddingBottom: SPACING.xl,
  },
  title: {
    color: COLORS.dark,
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(28),
    lineHeight: moderateScale(34),
    marginTop: SPACING.sm,
  },
  subtitle: {
    color: COLORS.textSoft,
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(15),
    lineHeight: moderateScale(22),
    marginTop: SPACING.sm,
  },
  section: {
    marginTop: SPACING.lg + verticalScale(2),
  },
  sectionTitle: {
    color: COLORS.dark,
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(18),
    marginBottom: SPACING.md,
  },
  buttonStack: {
    gap: SPACING.sm + verticalScale(4),
  },
});
