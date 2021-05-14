import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialState {
    template: boolean;
}

const initialState: InitialState = {
    template: true,
};

const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
        updateTemplateState: (state, { payload }: PayloadAction<InitialState>) => {
            (<(keyof InitialState)[]>Object.keys(payload)).map((key) => {
                state[key] = payload[key];
            });
        },
        resetTemplateState: (state) => {
            Object.assign(state, initialState);
        },
    },
});

// exporting reducer
export default templateSlice.reducer;

// exporting actions
export const { updateTemplateState, resetTemplateState } = templateSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const templateSelector: Selector<RootState, InitialState> = (state: RootState) =>
    state.template;
