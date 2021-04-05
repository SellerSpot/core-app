import { createMuiTheme, Theme } from '@material-ui/core';

// // Infering types from Route object with autocomplete support.
// const inferColorTypes = <T extends { [key: string]: IThemeColors }>(arg: T): T => arg;

// interface for the different colors used in the app
export interface IColors {
    // basic colors
    success: string;
    successLight: string;
    successDark: string;
    danger: string;
    dangerLight: string;
    dangerDark: string;
    warning: string;
    warningLight: string;
    warningDark: string;
    info: string;
    default: string;
    //foreground colors
    foregroundLight: string;
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
    primaryDark: string;
    accent: string;
    accentLight: string;
    accentDark: string;
    dark: string;
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
    success: Theme;
    danger: Theme;
    warning: Theme;
}

/**
 * Contains the different color themes used in the app
 */
export const colorThemes: IColorThemes = {
    default: {
        success: '#43AA8B',
        successLight: '#EDF7ED',
        successDark: '#2F7560',
        danger: '#F44336',
        dangerLight: '#FDECEA',
        dangerDark: '#D5190B',
        warning: '#FF9800',
        warningLight: '#FFF4E5',
        warningDark: '#B86E00',
        info: '#2196F3',
        default: '#878682',
        foregroundLight: '#FAFAFA',
        foregroundPrimary: '#5A5A5A',
        foregroundSecondary: '#767676',
        foregroundTertiary: '#C6C5C4',
        backgroundPrimary: '#FAFAFA',
        backgroundSecondary: '#F2F2F2',
        backgroundTertiary: '#E0E0E0',
        primary: '#1A73E8',
        dark: '#212121',
        primaryLight: '#D9E8FC',
        primaryDark: '#1152A7',
        accent: '#EE8572',
        accentLight: '#F8D0C9',
        accentDark: '#E65237',
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

// MUI themes used in app
const defaultMUITheme = <Theme>{
    typography: {
        fontFamily: 'Inter',
    },

    palette: {
        primary: {
            light: colorThemes.default.primaryLight,
            main: colorThemes.default.primary,
            dark: colorThemes.default.primaryDark,
        },
        secondary: {
            light: colorThemes.default.accentLight,
            main: colorThemes.default.accent,
            dark: colorThemes.default.accentDark,
        },
        text: {
            primary: colorThemes.default.foregroundPrimary,
            secondary: colorThemes.default.foregroundSecondary,
        },
    },
};

const successMUITheme = <Theme>{
    palette: {
        primary: {
            light: colorThemes.default.successLight,
            main: colorThemes.default.success,
            dark: colorThemes.default.successDark,
        },
    },
};

const dangerMUITheme = <Theme>{
    palette: {
        primary: {
            light: colorThemes.default.dangerLight,
            main: colorThemes.default.danger,
            dark: colorThemes.default.dangerDark,
        },
    },
};

const warningMUITheme = <Theme>{
    palette: {
        primary: {
            light: colorThemes.default.warningLight,
            main: colorThemes.default.warning,
            dark: colorThemes.default.warningDark,
        },
    },
};

/**
 * Contains the different Material UI themes used in the app
 */
export const muiThemes: IMuiThemes = {
    default: createMuiTheme(defaultMUITheme),
    success: createMuiTheme(defaultMUITheme, successMUITheme),
    danger: createMuiTheme(defaultMUITheme, dangerMUITheme),
    warning: createMuiTheme(defaultMUITheme, warningMUITheme),
};
