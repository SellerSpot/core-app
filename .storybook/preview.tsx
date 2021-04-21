import React, { ReactElement } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from '../src/store/store';
import { colorThemes, fontSizeThemes } from '../src/config/themes';
import { themeSelector } from '../src/store/models/theme';
import { ThemeProvider } from '@sellerspot/universal-components';
import '@hookstate/devtools';

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
    return (
        <ThemeProvider colors={colors} fontSizes={fontSizes}>
            {Story()}
        </ThemeProvider>
    );
};
