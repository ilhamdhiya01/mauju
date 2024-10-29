/**
 * Represents a set of color shades for various purposes in the application theme.
 */
type AppThemeColorSet = {
  darken: string; // The darken shade color.
  dark: string; // The dark shade color.
  main: string; // The main shade color.
  light: string; // The light shade color.
  lighten: string; // A lighter shade color.
  contrastText: string; // The text color that contrasts well with the shades.
};

/**
 * Represents a single color shade with various intensity levels (50-900) and contrast text.
 */
type ColorShade = {
  '50': string; // Shade level 50.
  '100': string; // Shade level 100.
  '200': string; // Shade level 200.
  '300': string; // Shade level 300.
  '400': string; // Shade level 400.
  '500': string; // Shade level 500 (main shade).
  '600': string; // Shade level 600.
  '700': string; // Shade level 700.
  '800': string; // Shade level 800.
  '900': string; // Shade level 900.
  contrastText: string; // The text color that contrasts well with this shade.
};

/**
 * Represents the theme colors used throughout the application.
 */
type ThemeColor = {
  primary: ColorShade; // Primary color shades.
  secondary: ColorShade; // Secondary color shades.
  danger: ColorShade; // Danger-related color shades.
  success: ColorShade; // Success-related color shades.
  info: ColorShade; // Information-related color shades.
  warning: ColorShade; // Warning-related color shades.
  neutral: ColorShade; // Neutral color shades.
};

/**
 * Represents a complete set of theme colors, including app-wide theme color sets and error-related color shades.
 */
type ThemeColorSet = AppThemeColorSet & {
  neutral: ColorShade; // Neutral color shades.
  error: AppThemeColorSet; // Error-related color shades.
};
