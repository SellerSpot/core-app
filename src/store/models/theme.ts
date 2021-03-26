import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { IThemeColors, IThemeFontSizes, themes } from 'config/themes';
import { RootState } from '../store';

interface IThemeState {
    colors: IThemeColors;
    fontSizes: IThemeFontSizes;
}

const initialState: IThemeState = {
    colors: themes.default,
    fontSizes: themes.default.fontSizes.default,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        updateTheme: (state, { payload }: PayloadAction<IThemeState>) => {
            state.colors = payload.colors;
            state.fontSizes = payload.fontSizes;
        },
        resetThemeState: (state) => {
            Object.assign(state, initialState);
        },
    },
});

// exporting reducer
export default themeSlice.reducer;

// exporting actions
export const { updateTheme, resetThemeState } = themeSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const themeSelector: Selector<RootState, IThemeState> = (state: RootState) => state.theme;
