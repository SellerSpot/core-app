import React, { ReactElement } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from '../src/store/store';
import { colorThemes, fontSizeThemes } from '../src/config/themes';
import { themeSelector } from '../src/store/models/theme';
import { ThemeProvider } from '@sellerspot/universal-components';
import { initializeThemeConfig } from '@sellerspot/universal-components';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
    (Story: () => ReactElement) => <Provider store={store}>{StoryComponent(Story)}</Provider>,
];

const StoryComponent = (Story: () => ReactElement): ReactElement => {
    const { colorTheme, fontSizeTheme } = store.getState().theme;
    const colors = colorThemes[colorTheme];
    const fontSizes = fontSizeThemes[fontSizeTheme];
    // initializing theme config for universal components
    // (so that theme data need not be sent for every component)
    initializeThemeConfig({
        colors,
        fontSizes,
    });
    return (
        <ThemeProvider colors={colors} fontSizes={fontSizes}>
            {Story()}
        </ThemeProvider>
    );
};
