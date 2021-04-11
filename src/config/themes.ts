import { createMuiTheme, Theme } from '@material-ui/core';
import { IColors, IFontSizes } from '@sellerspot/universal-components';

// Contains the different color themes used in the app
interface IColorThemes {
    light: IColors;
}

// Interface for the different font size themes used in the app
interface IFontSizeThemes {
    small: IFontSizes;
}

/**
 * Contains the different color themes used in the app
 */
export const colorThemes: IColorThemes = {
    light: {
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
        infoLight: '#77BEF8',
        infoDark: '#0A6FC2',
        autoLight: '#AFAEAC',
        auto: '#878682',
        autoDark: '#5E5D5A',
        foregroundLight: '#FAFAFA',
        foregroundPrimary: '#5A5A5A',
        foregroundSecondary: '#767676',
        foregroundTertiary: '#C6C5C4',
        backgroundDark: '#212121',
        backgroundPrimary: '#FAFAFA',
        backgroundSecondary: '#F2F2F2',
        backgroundTertiary: '#E0E0E0',
        primary: '#1A73E8',
        primaryLight: '#D9E8FC',
        primaryDark: '#1152A7',
        accent: '#EE8572',
        accentLight: '#F8D0C9',
        accentDark: '#E65237',
    },
};

export type TColorThemes = keyof typeof colorThemes;

/**
 * Contains the different font size themes used in the app
 */
export const fontSizeThemes: IFontSizeThemes = {
    small: {
        h1: '32px',
        h2: '24px',
        h3: '20px',
        h4: '18px',
        h5: '16px',
        h6: '14px',
        p: '12px',
    },
};

export type TFontSizeThemes = keyof typeof fontSizeThemes;
