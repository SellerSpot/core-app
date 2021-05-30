import { ThemeProvider as UniversalThemeProvider } from '@sellerspot/universal-components';
import { colorThemes, fontSizeThemes } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import 'react-sortable-tree/style.css';
import { TReactChildren } from 'typings/common.types';
import { themeSelector } from '../../../../store/models/theme';
import '../../../../styles/core.scss';

export interface IThemeProviderProps {
    children?: TReactChildren;
}

export default function ThemeProvider(props: IThemeProviderProps): ReactElement {
    // props
    const { children } = props;

    // state
    const { colorTheme, fontSizeTheme } = useSelector(themeSelector);

    // compute
    const currentColors = colorThemes[colorTheme];
    const currentFontSizes = fontSizeThemes[fontSizeTheme];

    // draw
    return (
        <UniversalThemeProvider colors={currentColors} fontSizes={currentFontSizes}>
            {children}
        </UniversalThemeProvider>
    );
}
