import { TColorThemes, TFontSizeThemes } from 'config/themes';
import { createSlice, Selector } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IThemeState {
    colorTheme: TColorThemes;
    fontSizeTheme: TFontSizeThemes;
}

const initialState: IThemeState = {
    colorTheme: 'light',
    fontSizeTheme: 'small',
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
