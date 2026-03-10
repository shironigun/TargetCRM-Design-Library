// TargetCRM Design System — Canonical Design Tokens
// Single source of truth for all design values extracted from SVG component library.
// All theme files (MUI + MAUI) derive from these tokens.

// ─── Colors ───────────────────────────────────────────────────────────────────

export const colors = {
  // Primary brand
  primary: {
    main: '#0055A4',
    hover: '#014787',
    focus: '#2F76B8',
    light: '#2F76B8',
    dark: '#014787',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#33BDFF',
    light: '#66D0FF',
    dark: '#0099DD',
    contrastText: '#FFFFFF',
  },

  // Semantic status
  error: {
    main: '#D11242',
    light: '#F9E3E0',
    dark: '#A00E34',
    contrastText: '#FFFFFF',
    background: '#F9E3E0',
  },
  warning: {
    main: '#F9932F',
    light: '#FFE6C1',
    dark: '#C77526',
    contrastText: '#FFFFFF',
    background: '#FFE6C1',
    backgroundAlt: '#FFEDD3',
  },
  info: {
    main: '#5BB0DF',
    light: '#DEEFF9',
    dark: '#4990B8',
    contrastText: '#FFFFFF',
    background: '#DEEFF9',
  },
  success: {
    main: '#5BAE4C',
    light: '#EEF9F2',
    dark: '#498B3D',
    contrastText: '#FFFFFF',
    background: '#EEF9F2',
    alt: '#4CAF51',
  },

  // Custom / Brand
  messenger: {
    main: '#5742BF',
    contrastText: '#FFFFFF',
  },
  facebook: {
    main: '#0866FF',
    contrastText: '#FFFFFF',
  },
  destructive: {
    main: '#E53A36',
    contrastText: '#FFFFFF',
  },
  infoCard: {
    main: '#2496F3',
    contrastText: '#FFFFFF',
  },
  badge: {
    main: '#C32828',
    contrastText: '#FFFFFF',
  },

  // Brand logos
  brand: {
    gold: '#EFB310',
    navy: '#004780',
  },

  // Neutral scale
  neutral: {
    900: '#202B3F',
    700: '#4B636E',
    600: '#808080',
    500: '#828282',
    400: '#A1A1AA',
    300: '#C4C4C4',
    200: '#D9D9D9',
    150: '#E1E1E1',
    100: '#EFEFEF',
    50: '#F7F7F7',
    0: '#FFFFFF',
  },

  // Semantic text
  text: {
    primary: '#202B3F',
    secondary: '#828282',
    disabled: '#C4C4C4',
    inverse: '#FFFFFF',
  },

  // Semantic backgrounds
  background: {
    default: '#FFFFFF',
    paper: '#F7F7F7',
    neutral: '#EFEFEF',
    overlay: '#1E1E27',
  },
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────────

export const borderRadius = {
  none: 0,
  xs: 2,        // checkboxes
  sm: 3.5,      // snackbar
  md: 7.5,      // inputs, alerts, outlined buttons
  default: 8,   // buttons, cards, calendar card
  lg: 11.5,     // chips (pill for 23h element)
  xl: 14,       // panels, modals, header chip
  avatar: 20,   // avatar (40×40 circle)
  pill: 21,     // pill button (42h)
  search: 24.5, // search bar (49h)
  fab: 25,      // FAB (50×50 circle)
  full: 9999,   // fully rounded
} as const;

// ─── Shadows ──────────────────────────────────────────────────────────────────

export const shadows = {
  card: '0px 4px 16px rgba(32, 43, 63, 0.08)',
  buttonMicro: '0px 1px 1px rgba(0, 0, 0, 0.25)',
  chip: '2px 2px 2px rgba(0, 0, 0, 0.15)',
  none: 'none',
} as const;

// ─── Opacity ──────────────────────────────────────────────────────────────────

export const opacity = {
  overlay: 0.1,
  annotation: 0.2,
  ghost: 0.4,
  shadowMicro: 0.15,
  shadowButton: 0.25,
  shadowCard: 0.08,
} as const;

// ─── Spacing / Component Dimensions ──────────────────────────────────────────

export const spacing = {
  /** Base spacing unit (px) */
  unit: 8,
  /** Spacing scale in px — multiply by unit */
  scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64] as const,
} as const;

export const componentSizes = {
  button: {
    small:    { width: 63,  height: 28 },
    medium:   { width: 77,  height: 36 },
    large:    { width: 96,  height: 40 },
    pill:     { width: 92,  height: 42 },
    outlined: { width: 99,  height: 39 },
  },
  input: {
    default: { width: 299, height: 54 },
    compact: { width: 389, height: 39 },
  },
  chip:             { height: 23 },
  headerChip:       { height: 28 },
  alert: {
    small:  { width: 295, height: 135 },
    medium: { width: 647, height: 111 },
    large:  { width: 811, height: 87 },
  },
  snackbar:         { width: 387, height: 39 },
  avatar:           { size: 40 },
  fab:              { size: 50 },
  notificationBadge:{ size: 18 },
  header:           { height: 60 },
  calendar: {
    card:         { width: 375, height: 314 },
    selectedDate: { size: 29 },
  },
  messengerCard: {
    card:     { width: 430, height: 108 },
    checkbox: { size: 23 },
  },
  quickAction: {
    headerHeight: 60,
    searchBar: { width: 335, height: 49 },
    tabIndicator: { width: 103.333, height: 2 },
    scrollbarThumb: { width: 8 },
  },
  progressBar:      { width: 153, height: 3 },
  msgActionButton:  { width: 73,  height: 28 },
  logo: {
    full:    { width: 280, height: 84 },
    compact: { width: 149, height: 47 },
  },
} as const;

// ─── Typography (INTERIM — blocked on Style Guide PDF) ───────────────────────

export const typography = {
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  variants: {
    h1:        { fontSize: 32, fontWeight: 700, lineHeight: 1.2 },
    h2:        { fontSize: 28, fontWeight: 700, lineHeight: 1.25 },
    h3:        { fontSize: 24, fontWeight: 600, lineHeight: 1.3 },
    h4:        { fontSize: 20, fontWeight: 600, lineHeight: 1.35 },
    h5:        { fontSize: 18, fontWeight: 600, lineHeight: 1.4 },
    h6:        { fontSize: 16, fontWeight: 600, lineHeight: 1.45 },
    subtitle1: { fontSize: 16, fontWeight: 500, lineHeight: 1.5 },
    subtitle2: { fontSize: 14, fontWeight: 500, lineHeight: 1.5 },
    body1:     { fontSize: 14, fontWeight: 400, lineHeight: 1.5 },
    body2:     { fontSize: 13, fontWeight: 400, lineHeight: 1.5 },
    button:    { fontSize: 14, fontWeight: 600, lineHeight: 1.5, textTransform: 'none' as const },
    caption:   { fontSize: 12, fontWeight: 400, lineHeight: 1.5 },
    overline:  { fontSize: 11, fontWeight: 600, lineHeight: 1.5, textTransform: 'uppercase' as const, letterSpacing: '0.08em' },
  },
} as const;
