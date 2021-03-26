import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { IThemeColors, themes } from 'config/themes';
import { RootState } from '../store';

interface IThemeState {
    colors: IThemeColors;
}

const initialState: IThemeState = {
    colors: themes.default,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        udpateThemeColors: (state, { payload }: PayloadAction<IThemeState>) => {
            state.colors = payload.colors;
        },
        resetThemeState: (state) => {
            Object.assign(state, initialState);
        },
    },
});

// exporting reducer
export default themeSlice.reducer;

// exporting actions
export const { udpateThemeColors, resetThemeState } = themeSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const themeSelector: Selector<RootState, IThemeState> = (state: RootState) => state.theme;
