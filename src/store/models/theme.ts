import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { IThemeColors, themes } from 'config/themes';
import { RootState } from '../store';

interface IThemeState {
    colors: IThemeColors;
}

const initialState: IThemeState = {
    colors: themes.default,
};

// initial apply
Object.keys(initialState.colors).forEach((key) => {
    document.documentElement.style.setProperty(
        `--${key}-color`,
        initialState.colors[key as keyof IThemeColors],
    );
});

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        udpateThemeState: (state, { payload }: PayloadAction<IThemeState>) => {
            (<(keyof IThemeState)[]>Object.keys(payload)).map((key) => {
                state[key] = payload[key];
            });
            Object.keys(state.colors).forEach((key) => {
                document.documentElement.style.setProperty(
                    `--${key}-color`,
                    state.colors[key as keyof IThemeColors],
                );
            });
        },
        resetThemeState: (state) => {
            Object.assign(state, initialState);
        },
    },
});

// exporting reducer
export default themeSlice.reducer;

// exporting actions
export const { udpateThemeState, resetThemeState } = themeSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const themeSelector: Selector<RootState, IThemeState> = (state: RootState) => state.theme;
