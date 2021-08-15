import React, { ReactElement } from 'react';
import 'react-sortable-tree/style.css';
import { ThemeProvider as UniversalThemeProvider } from '@sellerspot/universal-components';
import { TReactChildren } from 'typings/common.types';
import { useTheme } from '../../../../customHooks/useTheme';
import '../../../../styles/core.scss';

export interface IThemeProviderProps {
    children?: TReactChildren;
}

export default function ThemeProvider(props: IThemeProviderProps): ReactElement {
    // props
    const { children } = props;

    // state
    const { colors, fontSizes } = useTheme();

    // draw
    return (
        <UniversalThemeProvider colors={colors} fontSizes={fontSizes}>
            {children}
        </UniversalThemeProvider>
    );
}
