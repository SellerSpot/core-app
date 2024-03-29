import { colorThemes, fontSizeThemes, ThemeProvider } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import 'react-sortable-tree/style.css';
import { store } from '../src/store/store';
import '../src/styles/core.scss';

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
