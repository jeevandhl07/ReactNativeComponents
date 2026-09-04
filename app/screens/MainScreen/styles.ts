import { StyleSheet } from 'react-native';
import {
  BORDER_RADIUS,
  FONT_FAMILY,
  moderateScale,
  SPACING,
  verticalScale,
} from '../../constants';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.md + moderateScale(4),
    paddingBottom: SPACING.lg + verticalScale(4),
  },
  hero: {
    paddingTop: SPACING.md + verticalScale(2),
    paddingBottom: SPACING.md,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  logoImage: {
    borderRadius: BORDER_RADIUS.md,
    height: moderateScale(44),
    width: moderateScale(44),
  },
  kicker: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: moderateScale(13),
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(30),
    lineHeight: moderateScale(36),
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
  },
  searchBox: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    flexDirection: 'row',
    height: verticalScale(52),
    paddingHorizontal: SPACING.md - moderateScale(2),
  },
  searchIcon: {
    marginRight: SPACING.sm + moderateScale(2),
  },
  searchInput: {
    flex: 1,
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(16),
    height: verticalScale(50),
    padding: 0,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.lg - verticalScale(2),
    marginBottom: SPACING.md - verticalScale(2),
  },
  sectionTitle: {
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(20),
  },
  sectionMeta: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(13),
    marginTop: verticalScale(3),
  },
  card: {
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    marginBottom: SPACING.sm + verticalScale(4),
    padding: SPACING.md,
  },
  cardTopRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm + verticalScale(2),
  },
  cardCategory: {
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(12),
    marginBottom: verticalScale(4),
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(21),
  },
  cardDescription: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(15),
    lineHeight: moderateScale(22),
  },
  tokenRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.md - verticalScale(2),
  },
  token: {
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    paddingHorizontal: SPACING.sm + moderateScale(2),
    paddingVertical: SPACING.sm - verticalScale(1),
  },
  tokenText: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: moderateScale(12),
  },
  emptyState: {
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    padding: SPACING.md + moderateScale(2),
  },
  emptyTitle: {
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(18),
    marginBottom: SPACING.sm,
  },
  emptyText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(15),
    lineHeight: moderateScale(22),
  },
});
