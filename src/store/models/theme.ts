import { createSlice, Selector } from '@reduxjs/toolkit';
import { IColorThemes, IFontSizeThemes } from '@sellerspot/universal-components';
import { RootState } from '../store';

interface IThemeState {
    colorTheme: keyof IColorThemes;
    fontSizeTheme: keyof IFontSizeThemes;
}

const initialState: IThemeState = {
    colorTheme: 'default',
    fontSizeTheme: 'default',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {},
});

// exporting reducer
export default themeSlice.reducer;

// exporting actions
export const {} = themeSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const themeSelector: Selector<RootState, IThemeState> = (state: RootState) => state.theme;
