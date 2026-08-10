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
    paddingBottom: SPACING.lg - verticalScale(2),
  },
  logoMark: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
    height: moderateScale(48),
    justifyContent: 'center',
    marginBottom: SPACING.md + verticalScale(2),
    width: moderateScale(48),
  },
  logoText: {
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(16),
  },
  kicker: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: moderateScale(13),
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(32),
    lineHeight: moderateScale(38),
    marginBottom: SPACING.sm + verticalScale(4),
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
    fontFamily: FONT_FAMILY.bold,
    fontSize: moderateScale(20),
    marginRight: SPACING.sm + moderateScale(2),
  },
  searchInput: {
    flex: 1,
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(16),
    height: verticalScale(50),
    padding: 0,
  },
  categoryList: {
    gap: SPACING.sm + moderateScale(2),
    paddingBottom: SPACING.lg - verticalScale(2),
    paddingTop: SPACING.md,
  },
  categoryChip: {
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    minHeight: verticalScale(40),
    paddingHorizontal: SPACING.md - moderateScale(2),
    paddingVertical: SPACING.sm + verticalScale(2),
  },
  categoryText: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: moderateScale(14),
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  statusPill: {
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm + moderateScale(4),
    paddingVertical: SPACING.sm,
  },
  statusPillText: {
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(13),
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
  itemStatus: {
    borderRadius: BORDER_RADIUS.md,
    marginLeft: SPACING.sm + moderateScale(4),
    paddingHorizontal: SPACING.sm + moderateScale(2),
    paddingVertical: SPACING.sm - verticalScale(1),
  },
  itemStatusText: {
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(12),
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
  nextPanel: {
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    marginTop: SPACING.sm + verticalScale(2),
    padding: SPACING.md + moderateScale(2),
  },
  nextTitle: {
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: moderateScale(18),
    marginBottom: SPACING.sm,
  },
  nextText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(15),
    lineHeight: moderateScale(22),
  },
});
