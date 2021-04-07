import React, { ReactElement, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core';
import { colorThemes, fontSizeThemes, IColors, IFontSizes } from 'config/themes';
import { useSelector } from 'react-redux';
import { themeSelector } from 'store/models/theme';
import '../../styles/core.scss';
import { getMUITheme } from './MUIThemes';

export interface IThemeProviderProps {
    children?: ReactElement | ReactElement[] | string | number;
}

export default function ThemeProvider(props: IThemeProviderProps): ReactElement {
    // fetching theme names from store
    const themeStore = useSelector(themeSelector);

    // fetching themes based on the theme names
    const currentColorTheme = colorThemes[themeStore.colorTheme];
    const currentFontSizeTheme = fontSizeThemes[themeStore.fontSizeTheme];

    // applying the theme from store to dom
    useEffect(() => {
        Object.keys(currentColorTheme).forEach((key) => {
            document.documentElement.style.setProperty(
                `--${key}-color`,
                currentColorTheme[key as keyof IColors],
            );
        });
        Object.keys(currentFontSizeTheme).forEach((key) => {
            document.documentElement.style.setProperty(
                `--${key}-fontsize`,
                currentFontSizeTheme[key as keyof IFontSizes],
            );
        });
    }, [themeStore]);

    return (
        <MUIThemeProvider theme={getMUITheme('primary', themeStore.colorTheme)}>
            {props.children}
        </MUIThemeProvider>
    );
}
