import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider as UniversalThemeProvider } from '@sellerspot/universal-components';

import { themeSelector } from 'store/models/theme';
import { colorThemes, fontSizeThemes, IColors, IFontSizes } from 'config/themes';
import { TReactChildren } from 'typings/common.types';

import '../../../../styles/core.scss';

export interface IThemeProviderProps {
    children?: TReactChildren;
}

export default function ThemeProvider(props: IThemeProviderProps): ReactElement {
    // selectors
    const themeStore = useSelector(themeSelector);

    // props
    const { children } = props;

    // locals
    // fetching themes based on the theme names
    const currentColorTheme = colorThemes[themeStore.colorTheme];
    const currentFontSizeTheme = fontSizeThemes[themeStore.fontSizeTheme];

    // effects
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

    // draw
    return (
        <UniversalThemeProvider colors={currentColorTheme} fontSizes={currentFontSizeTheme}>
            {children}
        </UniversalThemeProvider>
    );
}
