import { ThemeProvider as UniversalThemeProvider } from '@sellerspot/universal-components';
import { colorThemes, fontSizeThemes } from 'config/themes';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'store/models/theme';
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

    // draw
    return (
        <UniversalThemeProvider colors={currentColorTheme} fontSizes={currentFontSizeTheme}>
            {children}
        </UniversalThemeProvider>
    );
}
