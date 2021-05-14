import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialState {
    isLoading: boolean;
}

const initialState: InitialState = {
    isLoading: true,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateAppLoadingState: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
    },
});

// exporting reducer
export default appSlice.reducer;

// exporting actions
export const { updateAppLoadingState } = appSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const appSelector: Selector<RootState, InitialState> = (state: RootState) => state.app;
