// TargetCRM Design System — MUI Theme Configuration
// Built from canonical design tokens.  Uses MUI v7 createTheme API.

import { createTheme, type ThemeOptions } from '@mui/material/styles';
import { colors, borderRadius, shadows, typography } from './tokens';

// ─── Module augmentation for custom palette colors ────────────────────────────

declare module '@mui/material/styles' {
  interface Palette {
    messenger: Palette['primary'];
    facebook: Palette['primary'];
    destructive: Palette['primary'];
    neutral: {
      900: string; 700: string; 600: string; 500: string; 400: string;
      300: string; 200: string; 150: string; 100: string; 50: string; 0: string;
    };
    brand: { gold: string; navy: string };
  }
  interface PaletteOptions {
    messenger?: PaletteOptions['primary'];
    facebook?: PaletteOptions['primary'];
    destructive?: PaletteOptions['primary'];
    neutral?: {
      900: string; 700: string; 600: string; 500: string; 400: string;
      300: string; 200: string; 150: string; 100: string; 50: string; 0: string;
    };
    brand?: { gold: string; navy: string };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    messenger: true;
    facebook: true;
    destructive: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    messenger: true;
  }
}

// ─── Theme options ────────────────────────────────────────────────────────────

const themeOptions: ThemeOptions = {
  cssVariables: true,

  palette: {
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
      contrastText: colors.primary.contrastText,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
      contrastText: colors.secondary.contrastText,
    },
    error: {
      main: colors.error.main,
      light: colors.error.light,
      dark: colors.error.dark,
      contrastText: colors.error.contrastText,
    },
    warning: {
      main: colors.warning.main,
      light: colors.warning.light,
      dark: colors.warning.dark,
      contrastText: colors.warning.contrastText,
    },
    info: {
      main: colors.info.main,
      light: colors.info.light,
      dark: colors.info.dark,
      contrastText: colors.info.contrastText,
    },
    success: {
      main: colors.success.main,
      light: colors.success.light,
      dark: colors.success.dark,
      contrastText: colors.success.contrastText,
    },
    messenger: {
      main: colors.messenger.main,
      light: '#7A6BD4',
      dark: '#3E2F99',
      contrastText: colors.messenger.contrastText,
    },
    facebook: {
      main: colors.facebook.main,
      light: '#3A85FF',
      dark: '#0651CC',
      contrastText: colors.facebook.contrastText,
    },
    destructive: {
      main: colors.destructive.main,
      light: '#FF6B67',
      dark: '#B52E2B',
      contrastText: colors.destructive.contrastText,
    },
    neutral: colors.neutral,
    brand: colors.brand,
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.disabled,
    },
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
    divider: colors.neutral[200],
  },

  typography: {
    fontFamily: typography.fontFamily,
    h1: typography.variants.h1,
    h2: typography.variants.h2,
    h3: typography.variants.h3,
    h4: typography.variants.h4,
    h5: typography.variants.h5,
    h6: typography.variants.h6,
    subtitle1: typography.variants.subtitle1,
    subtitle2: typography.variants.subtitle2,
    body1: typography.variants.body1,
    body2: typography.variants.body2,
    button: typography.variants.button,
    caption: typography.variants.caption,
    overline: typography.variants.overline,
  },

  shape: {
    borderRadius: borderRadius.default,
  },

  // ─── Component overrides ──────────────────────────────────────────────────

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      `,
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: 14,
          borderRadius: borderRadius.default,
          boxShadow: shadows.buttonMicro,
          '&:hover': {
            boxShadow: shadows.buttonMicro,
          },
        },
        sizeSmall: {
          height: 28,
          fontSize: 12,
          padding: '4px 12px',
        },
        sizeMedium: {
          height: 36,
          padding: '6px 16px',
        },
        sizeLarge: {
          height: 40,
          padding: '8px 20px',
          fontSize: 15,
        },
        containedPrimary: {
          backgroundColor: colors.primary.main,
          '&:hover': { backgroundColor: colors.primary.hover },
          '&:focus-visible': { backgroundColor: colors.primary.focus },
          '&.Mui-disabled': {
            backgroundColor: colors.neutral[300],
            color: colors.text.inverse,
          },
        },
        outlined: {
          borderRadius: borderRadius.md,
          borderColor: colors.primary.main,
          color: colors.primary.main,
          backgroundColor: colors.background.default,
          '&:hover': {
            backgroundColor: colors.info.background,
            borderColor: colors.primary.hover,
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained', className: 'pill' },
          style: {
            borderRadius: borderRadius.pill,
            height: 42,
            paddingLeft: 24,
            paddingRight: 24,
          },
        },
        {
          props: { variant: 'contained', color: 'inherit' },
          style: {
            backgroundColor: colors.neutral[100],
            color: colors.text.primary,
            '&:hover': {
              backgroundColor: colors.neutral[200],
            },
          },
        },
      ],
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: colors.primary.main,
          '&:hover': {
            backgroundColor: `${colors.primary.main}14`,
          },
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'medium',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: borderRadius.md,
            '& fieldset': {
              borderColor: colors.neutral[200],
            },
            '&:hover fieldset': {
              borderColor: colors.neutral[300],
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary.main,
              borderWidth: 2,
            },
            '&.Mui-error fieldset': {
              borderColor: colors.error.main,
            },
            '&.Mui-disabled fieldset': {
              borderColor: colors.neutral[300],
            },
          },
        },
      },
      variants: [
        {
          props: { size: 'small' },
          style: {
            '&:not(:has(.MuiInputBase-inputMultiline)) .MuiOutlinedInput-root': {
              height: 39,
            },
          },
        },
        {
          props: { size: 'medium' },
          style: {
            '&:not(:has(.MuiInputBase-inputMultiline)) .MuiOutlinedInput-root': {
              height: 54,
            },
          },
        },
      ],
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.lg,
          fontSize: 12,
          fontWeight: 500,
        },
        filled: {
          backgroundColor: colors.neutral[100],
          color: colors.text.primary,
          '&.MuiChip-colorPrimary': {
            backgroundColor: colors.primary.main,
            color: colors.primary.contrastText,
          },
        },
        outlined: {
          borderColor: colors.neutral[300],
          backgroundColor: colors.background.default,
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.md,
        },
        standardInfo: {
          backgroundColor: colors.info.background,
          color: colors.text.primary,
          '& .MuiAlert-icon': { color: colors.info.main },
        },
        standardWarning: {
          backgroundColor: colors.warning.backgroundAlt,
          color: colors.text.primary,
          '& .MuiAlert-icon': { color: colors.warning.main },
        },
        standardError: {
          backgroundColor: colors.error.background,
          color: colors.text.primary,
          '& .MuiAlert-icon': { color: colors.error.main },
        },
        standardSuccess: {
          backgroundColor: colors.success.background,
          color: colors.text.primary,
          '& .MuiAlert-icon': { color: colors.success.main },
        },
      },
    },

    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.sm,
          minHeight: 39,
          padding: '4px 16px',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.default,
          boxShadow: shadows.card,
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 40,
          height: 40,
          backgroundColor: colors.primary.main,
          color: colors.primary.contrastText,
          fontSize: 16,
          fontWeight: 600,
        },
      },
    },

    MuiFab: {
      styleOverrides: {
        root: {
          width: 50,
          height: 50,
          borderRadius: borderRadius.fab,
          backgroundColor: colors.primary.main,
          color: colors.primary.contrastText,
          boxShadow: shadows.card,
          '&:hover': {
            backgroundColor: colors.primary.hover,
          },
        },
      },
    },

    MuiBadge: {
      styleOverrides: {
        badge: {
          minWidth: 18,
          height: 18,
          fontSize: 11,
          fontWeight: 600,
          borderRadius: 9,
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: borderRadius.xl,
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: 14,
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 2,
          backgroundColor: colors.primary.main,
        },
      },
    },

    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.neutral[200],
        },
      },
    },
  },
};

// ─── Export theme ─────────────────────────────────────────────────────────────

export const targetCRMTheme = createTheme(themeOptions);

export default targetCRMTheme;
