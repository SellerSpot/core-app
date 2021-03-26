export interface IThemeFontSizes {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
    p: string;
}

export interface IThemeColors {
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

const inferColorTypes = <T extends { [key: string]: IThemeColors }>(arg: T): T => arg; // Infering types from Route object with autocomplete support.
const inferFontStyleTypes = <T extends { [key: string]: IThemeFontSizes }>(arg: T): T => arg; // Infering types from Route object with autocomplete support.
export type TThemes = keyof typeof themes;

export const themes = inferColorTypes({
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

        fontSizes: inferFontStyleTypes({
            default: {
                h1: '32px',
                h2: '24px',
                h3: '20px',
                h4: '18px',
                h5: '16px',
                h6: '14px',
                p: '12px',
            },
        }),
    },
});
