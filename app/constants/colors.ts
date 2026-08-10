export const COLORS = {
  // Main - ReactNativeComponents Brand
  primary: '#087EF5',
  secondary: '#EAF5FF',
  background: '#FFFFFF',

  // Brand
  brandBlue: '#087EF5',
  brandCyan: '#08C4E8',
  brandNavy: '#08266B',
  brandLight: '#DDEEFF',

  // Text
  text: '#071A45',
  textSoft: '#617092',
  ink: '#071A45',
  inkMuted: '#617092',

  // Useful
  dark: '#071A45',
  white: '#FFFFFF',
  black: '#000000',

  stroke: '#DCE8F5',
  divider: '#E8F1FA',
  inputStroke: '#A8BCD1',

  // Status
  danger: '#DC2626',
  success: '#16A34A',
  warning: '#F59E0B',
  info: '#087EF5',

  // UI
  iconBg: '#EFF7FF',
  card: '#FFFFFF',
  cardSoft: '#F5FAFF',
  disabled: '#B9C9DA',
};

export type AppTheme = {
  canvas: string;
  surface: string;
  ink: string;
  muted: string;
  subtle: string;
  border: string;
  accent: string;
  token: string;
  ready: string;
  readySoft: string;
  warning: string;
  warningSoft: string;
  planned: string;
  plannedSoft: string;
  nextMuted: string;
};

export const APP_THEMES: Record<'light' | 'dark', AppTheme> = {
  light: {
    canvas: '#f6f8fb',
    surface: COLORS.white,
    ink: '#172033',
    muted: '#667085',
    subtle: '#98a2b3',
    border: '#e1e7ef',
    accent: '#2563eb',
    token: '#f4f7fb',
    ready: '#027a48',
    readySoft: '#dff7ea',
    warning: '#b54708',
    warningSoft: '#fff1d6',
    planned: '#475467',
    plannedSoft: '#eef2f6',
    nextMuted: '#c9d3e1',
  },
  dark: {
    canvas: '#111827',
    surface: '#1f2937',
    ink: '#f8fafc',
    muted: '#b6c2d1',
    subtle: '#7d8da1',
    border: '#344154',
    accent: '#60a5fa',
    token: '#263244',
    ready: '#7ee2a8',
    readySoft: '#123d2a',
    warning: '#f8c76d',
    warningSoft: '#46320d',
    planned: '#cbd5e1',
    plannedSoft: '#334155',
    nextMuted: '#b6c2d1',
  },
};
