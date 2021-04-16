import React, { ReactElement } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from '../src/store/store';
import { colorThemes, fontSizeThemes } from '../src/config/themes';
import { themeSelector } from '../src/store/models/theme';
import ThemeProvider from '../src/components/ThemeProvider/ThemeProvider';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
    (Story: () => ReactElement) => (
        <Provider store={store}>
            <ThemeProvider>
                <Story />
            </ThemeProvider>
        </Provider>
    ),
];
