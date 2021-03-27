import { IColors, IFontSizes } from 'config/themes';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'store/models/theme';
import '../../styles/core.scss';

import { ThemeProvider as MUIThemeProvider } from '@material-ui/core';

export interface IThemeProviderProps {
    children?: ReactElement | ReactElement[] | string | number;
}

export default function ThemeProvider(props: IThemeProviderProps): ReactElement {
    const theme = useSelector(themeSelector);
    // applying the theme from store to dom
    useEffect(() => {
        Object.keys(theme.colors).forEach((key) => {
            document.documentElement.style.setProperty(
                `--${key}-color`,
                theme.colors[key as keyof IColors],
            );
        });
        Object.keys(theme.fontSizes).forEach((key) => {
            document.documentElement.style.setProperty(
                `--${key}-fontsize`,
                theme.fontSizes[key as keyof IFontSizes],
            );
        });
    }, [theme]);

    return <MUIThemeProvider theme={theme.muiTheme}>{props.children}</MUIThemeProvider>;
}
