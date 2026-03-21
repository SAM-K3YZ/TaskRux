import { scale, verticalScale } from '@/utils/styling';

export const palette = {
  // Brand
  brandOrange: '#F96706',
  brandOrangeLight: '#FAB87A',
  brandOrangeDark: '#D94F00',

  // Navy (from design system deep navy)
  navy900: '#1E2938',
  navy800: '#263445',
  navy700: '#2E3F55',

  // Neutrals (warm stone — your existing scale)
  neutral50: '#fafaf9',
  neutral100: '#f5f5f4',
  neutral200: '#e7e5e4',
  neutral300: '#d6d3d1',
  neutral350: '#CCCCCC',
  neutral400: '#a8a29e',
  neutral500: '#78716c',
  neutral600: '#57534e',
  neutral700: '#44403c',
  neutral800: '#292524',
  neutral900: '#1c1917',

  // Dark surface tokens (from dark mode design system)
  darkBase: '#23170f', // outermost background
  darkSurface: '#1a110b', // card / input fill
  darkDeep: '#130d07', // deeply nested elements

  // Semantic
  white: '#ffffff',
  black: '#000000',
  successGreen: '#22C55E',
  errorRed: '#EF4444',

  // Chat bubbles (your existing)
  otherBubble: '#FFF1BF',
  myBubble: '#FFE1CC',

  // Legacy yellow (your existing primary — keep if needed)
  yellow: '#facc15',
  yellowLight: '#fef08a',
  yellowDark: '#eab308',

  //non-brand color
  blue: '#1193D4',
  blueLight: '#cbe7f7',
  greenLight: '#DCFCE7',
};

// ----------------------------------------------------------
// LIGHT MODE — semantic tokens
// ----------------------------------------------------------
export const light = {
  // Background layers
  background: palette.neutral50, // #fafaf9 — page bg
  surface: palette.white, // #ffffff — card bg
  surfaceRaised: palette.neutral100, // #f5f5f4 — elevated card
  overlay: palette.neutral200, // #e7e5e4 — modal scrim

  // Brand / Actions
  primary: palette.brandOrange, // #F96706
  primaryLight: palette.brandOrangeLight, // #FAB87A
  primaryDark: palette.brandOrangeDark, // #D94F00
  primaryForeground: palette.white, // text on primary buttons

  // Text
  textPrimary: palette.navy900, // #1E2938 — headings, contrast
  textSecondary: palette.neutral600, // #57534e — body / subtext
  textMuted: palette.neutral400, // #a8a29e — placeholders, meta
  textInverse: palette.white, // text on dark surfaces
  textOnPrimary: palette.white, // text on orange bg

  // Borders & Dividers
  border: palette.neutral200, // #e7e5e4
  borderStrong: palette.neutral300, // #d6d3d1
  borderFocus: palette.brandOrange, // #F96706

  // Form inputs
  inputBg: palette.white,
  inputBorder: palette.neutral300,
  inputBorderFocus: palette.brandOrange,
  inputBorderError: palette.errorRed,
  inputPlaceholder: palette.neutral400,

  // States
  success: palette.successGreen, // #22C55E
  successBg: '#dcfce7',
  error: palette.errorRed, // #EF4444
  errorBg: '#fee2e2',
  warning: palette.yellow,
  warningBg: '#fefce8',

  // Toggle / Switch
  toggleActive: palette.brandOrange,
  toggleInactive: palette.neutral300,
  toggleThumb: palette.white,

  // Chat bubbles
  bubbleOther: palette.otherBubble, // #FFF1BF
  bubbleMine: palette.myBubble, // #FFE1CC

  // Misc
  shadow: 'rgba(0,0,0,0.08)',
  shadowStrong: 'rgba(0,0,0,0.16)',
  scrim: 'rgba(0,0,0,0.4)',
};

// ----------------------------------------------------------
// DARK MODE — semantic tokens
// ----------------------------------------------------------
export const dark = {
  // Background layers
  background: palette.darkBase, // #23170f — page bg
  surface: palette.darkSurface, // #1a110b — card bg
  surfaceRaised: '#1f1409', // slightly lighter card
  overlay: palette.darkDeep, // #130d07 — deeply nested

  // Brand / Actions
  primary: palette.brandOrange, // #F96706
  primaryLight: palette.brandOrangeLight, // #FAB87A
  primaryDark: palette.brandOrangeDark, // #D94F00
  primaryForeground: palette.white, // text on primary buttons

  // Text
  textPrimary: palette.white, // #ffffff — headings
  textSecondary: palette.neutral400, // #a8a29e — body / subtext
  textMuted: palette.neutral500, // #78716c — placeholders, meta
  textInverse: palette.neutral900, // text on light surfaces
  textOnPrimary: palette.white, // text on orange bg

  // Borders & Dividers
  border: '#2a1d12', // subtle warm dark border
  borderStrong: '#3a2a1a', // more visible
  borderFocus: palette.brandOrange, // #F96706

  // Form inputs
  inputBg: palette.darkSurface, // #1a110b
  inputBorder: '#2a1d12',
  inputBorderFocus: palette.brandOrange,
  inputBorderError: palette.errorRed,
  inputPlaceholder: palette.neutral600,

  // States
  success: palette.successGreen, // #22C55E
  successBg: '#052e16',
  error: palette.errorRed, // #EF4444
  errorBg: '#450a0a',
  warning: palette.yellow,
  warningBg: '#422006',

  // Toggle / Switch
  toggleActive: palette.brandOrange,
  toggleInactive: palette.neutral700,
  toggleThumb: palette.white,

  // Chat bubbles
  bubbleOther: '#2a1e0e', // darkened warm tint
  bubbleMine: '#231508', // darkened peach tint

  // Misc
  shadow: 'rgba(0,0,0,0.4)',
  shadowStrong: 'rgba(0,0,0,0.7)',
  scrim: 'rgba(0,0,0,0.6)',
};

export const spacingX = {
  _3: scale(3),
  _5: scale(5),
  _7: scale(7),
  _10: scale(10),
  _12: scale(12),
  _15: scale(15),
  _20: scale(20),
  _25: scale(25),
  _30: scale(30),
  _35: scale(35),
  _40: scale(40),
};

export const spacingY = {
  _5: verticalScale(5),
  _7: verticalScale(7),
  _10: verticalScale(10),
  _12: verticalScale(12),
  _15: verticalScale(15),
  _17: verticalScale(17),
  _20: verticalScale(20),
  _25: verticalScale(25),
  _30: verticalScale(30),
  _35: verticalScale(35),
  _40: verticalScale(40),
  _50: verticalScale(50),
  _60: verticalScale(60),
};

export const radius = {
  _3: verticalScale(3),
  _6: verticalScale(6),
  _10: verticalScale(10),
  _12: verticalScale(12),
  _15: verticalScale(15),
  _17: verticalScale(17),
  _20: verticalScale(20),
  _30: verticalScale(30),
  _40: verticalScale(40),
  _50: verticalScale(50),
  _60: verticalScale(60),
  _70: verticalScale(70),
  _80: verticalScale(80),
  _90: verticalScale(90),
  full: 200,
};
