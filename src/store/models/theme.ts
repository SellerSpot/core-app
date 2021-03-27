import { Theme } from '@material-ui/core';
import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { colorThemes, fontSizeThemes, IColors, IFontSizes, muiThemes } from 'config/themes';
import { RootState } from '../store';

interface IThemeState {
    colors: IColors;
    fontSizes: IFontSizes;
    muiTheme: Omit<Theme, 'props'>;
}

const initialState: IThemeState = {
    colors: colorThemes.default,
    fontSizes: fontSizeThemes.default,
    muiTheme: muiThemes.default,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        updateColorsTheme: (state, { payload }: PayloadAction<Pick<IThemeState, 'colors'>>) => {
            state.colors = payload.colors;
        },
        updateFontSizesTheme: (
            state,
            { payload }: PayloadAction<Pick<IThemeState, 'fontSizes'>>,
        ) => {
            state.fontSizes = payload.fontSizes;
        },
        updateMUITheme: (state, { payload }: PayloadAction<Pick<IThemeState, 'muiTheme'>>) => {
            state.muiTheme = payload.muiTheme;
        },
        resetThemeState: (state) => {
            Object.assign(state, initialState);
        },
    },
});

// exporting reducer
export default themeSlice.reducer;

// exporting actions
export const { updateColorsTheme, updateFontSizesTheme, resetThemeState } = themeSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const themeSelector: Selector<RootState, IThemeState> = (state: RootState) => state.theme;
