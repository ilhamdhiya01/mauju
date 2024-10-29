import { DEFAULT_COMPONENT_THEME, DEFAULT_THEME_COLOR } from '@constants/theme';
import { useEffect, useMemo, useState } from 'react';

const useScreenComponentTheme = (themeVariant: ThemeVariant = 'default') => {
  // TODO : use generalStore appTheme
  //   const { appTheme } = useApplicationSettingsStore();

  const defaultTheme: ThemeColorSet = useMemo(
    () => ({
      // TODO : use generalStore appTheme
      //   dark: appTheme.primary.dark,
      //   main: appTheme.primary.main,
      //   light: appTheme.primary.light,
      //   lighten: appTheme.primary.lighten,
      //   contrastText: appTheme.primary.contrastText,
      ...DEFAULT_COMPONENT_THEME,
    }),
    [
      // TODO : use generalStore appTheme
      //   appTheme.primary.contrastText,
      //   appTheme.primary.dark,
      //   appTheme.primary.light,
      //   appTheme.primary.lighten,
      //   appTheme.primary.main,
    ]
  );

  const [themeColorSet, setThemeColorSet] =
    useState<ThemeColorSet>(defaultTheme);

  useEffect(() => {
    if (themeVariant !== 'default') {
      setThemeColorSet((state) => ({
        ...state,
        darken: DEFAULT_THEME_COLOR[themeVariant][900],
        dark: DEFAULT_THEME_COLOR[themeVariant][700],
        main: DEFAULT_THEME_COLOR[themeVariant][600],
        light: DEFAULT_THEME_COLOR[themeVariant][200],
        lighten:
          themeVariant === 'neutral'
            ? DEFAULT_THEME_COLOR[themeVariant][100]
            : DEFAULT_THEME_COLOR[themeVariant][50],
        contrastText: DEFAULT_THEME_COLOR[themeVariant].contrastText,
        // TODO : use generalStore appTheme
        // dark:
        //   themeVariant === 'primary' || themeVariant === 'secondary'
        //     ? appTheme[themeVariant].dark
        //     : DEFAULT_THEME_COLOR[themeVariant][700],
        // main:
        //   themeVariant === 'primary' || themeVariant === 'secondary'
        //     ? appTheme[themeVariant].main
        //     : DEFAULT_THEME_COLOR[themeVariant][600],
        // light:
        //   themeVariant === 'primary' || themeVariant === 'secondary'
        //     ? appTheme[themeVariant].light
        //     : DEFAULT_THEME_COLOR[themeVariant][200],
        // lighten:
        //   themeVariant === 'primary' || themeVariant === 'secondary'
        //     ? appTheme[themeVariant].lighten
        //     : DEFAULT_THEME_COLOR[themeVariant][50],
        // contrastText:
        //   themeVariant === 'primary' || themeVariant === 'secondary'
        //     ? appTheme[themeVariant].contrastText
        //     : DEFAULT_THEME_COLOR[themeVariant].contrastText,
      }));
    } else {
      setThemeColorSet(DEFAULT_COMPONENT_THEME);
    }
    return () => {
      setThemeColorSet(DEFAULT_COMPONENT_THEME);
    };
  }, [DEFAULT_COMPONENT_THEME, themeVariant]);

  return {
    ...themeColorSet,
  };
};

export default useScreenComponentTheme;
