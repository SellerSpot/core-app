import { createMuiTheme, Theme } from '@material-ui/core';

// // Infering types from Route object with autocomplete support.
// const inferColorTypes = <T extends { [key: string]: IThemeColors }>(arg: T): T => arg;

// interface for the different colors used in the app
export interface IColors {
    // basic colors
    success: string;
    successLight: string;
    danger: string;
    dangerLight: string;
    warning: string;
    warningLight: string;
    info: string;
    default: string;
    //foreground colors
    foregroundPrimary: string;
    foregroundSecondary: string;
    foregroundTertiary: string;
    // background colors
    backgroundPrimary: string;
    backgroundSecondary: string;
    backgroundTertiary: string;
    // primary colors
    primary: string;
    primaryLight: string;
    accent: string;
}

// interface for the fontsizes used in the app
export interface IFontSizes {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
    p: string;
}

// Contains the different color themes used in the app
interface IColorThemes {
    default: IColors;
}

// Interface for the different font size themes used in the app
interface IFontSizeThemes {
    default: IFontSizes;
}

// Interface for the different Material UI themes used in the app
interface IMuiThemes {
    default: Theme;
}

/**
 * Contains the different color themes used in the app
 */
export const colorThemes: IColorThemes = {
    default: {
        success: '#43AA8B',
        successLight: '#EDF7ED',
        danger: '#F44336',
        dangerLight: '#FDECEA',
        warning: '#FF9800',
        warningLight: '#FFF4E5',
        info: '#2196F3',
        default: '#878682',
        foregroundPrimary: '#5A5A5A',
        foregroundSecondary: '#767676',
        foregroundTertiary: '#C6C5C4',
        backgroundPrimary: '#FAFAFA',
        backgroundSecondary: '#F2F2F2',
        backgroundTertiary: '#DAD9D6',
        primary: '#1A73E8',
        primaryLight: '#D9E8FC',
        accent: '#EE8572',
    },
};

/**
 * Contains the different font size themes used in the app
 */
export const fontSizeThemes: IFontSizeThemes = {
    default: {
        h1: '32px',
        h2: '24px',
        h3: '20px',
        h4: '18px',
        h5: '16px',
        h6: '14px',
        p: '12px',
    },
};

/**
 * Contains the different Material UI themes used in the app
 */
export const muiThemes: IMuiThemes = {
    default: createMuiTheme({
        palette: {
            primary: {
                main: colorThemes.default.primary,
            },
            secondary: {
                main: colorThemes.default.accent,
            },
            text: {
                primary: colorThemes.default.primary,
            },
        },
    }),
};
