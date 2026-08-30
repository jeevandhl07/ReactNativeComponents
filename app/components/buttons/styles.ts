import { StyleSheet } from 'react-native';
import {
  BORDER_RADIUS,
  FONT_FAMILY,
  moderateScale,
  SPACING,
  verticalScale,
} from '../../constants';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  sm: {
    minHeight: verticalScale(38),
    paddingHorizontal: SPACING.md - moderateScale(2),
  },
  md: {
    minHeight: verticalScale(46),
    paddingHorizontal: SPACING.md,
  },
  lg: {
    minHeight: verticalScale(54),
    paddingHorizontal: SPACING.lg,
  },
  title: {
    fontFamily: FONT_FAMILY.bold,
  },
  smTitle: {
    fontSize: moderateScale(13),
  },
  mdTitle: {
    fontSize: moderateScale(15),
  },
  lgTitle: {
    fontSize: moderateScale(16),
  },
  leftLabel: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    height: moderateScale(20),
    justifyContent: 'center',
    marginRight: SPACING.sm,
    minWidth: moderateScale(20),
    paddingHorizontal: moderateScale(5),
  },
  leftLabelText: {
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(10),
  },
});
