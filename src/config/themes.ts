export interface IThemeColors {
    primary: string;
    secondary: string;
    tertiary: string;
}

const inferColorTypes = <T extends { [key: string]: IThemeColors }>(arg: T): T => arg; // Infering types from Route object with autocomplete support.

export type TThemes = keyof typeof themes;

export const themes = inferColorTypes({
    default: {
        primary: 'black',
        secondary: 'white',
        tertiary: 'dark',
    },
});
