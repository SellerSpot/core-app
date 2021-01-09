import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialState {
    isLeftNavBarExpanded: boolean;
}

const initialState: InitialState = {
    isLeftNavBarExpanded: true,
};

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        updateCommonState: (state, { payload }: PayloadAction<InitialState>) => {
            (<(keyof InitialState)[]>Object.keys(payload)).map((key, index) => {
                state[key] = payload[key];
            });
        },
        resetCommonState: (state) => {
            Object.assign(state, initialState);
        },
    },
});

// exporting reducer
export default commonSlice.reducer;

// exporting actions
export const { updateCommonState, resetCommonState } = commonSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const commonSelector: Selector<RootState, InitialState> = (state: RootState) => state.common;
