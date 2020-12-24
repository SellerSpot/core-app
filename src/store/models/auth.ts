import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialState {
    isAuthenticated: boolean;
    token: string;
    name: string;
    id: string;
    email: string;
    profilePicture: string;
}

const initialState: InitialState = {
    isAuthenticated: false,
    token: '',
    name: '',
    id: '',
    email: '',
    profilePicture: '',
};

const coreSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticate: (state, { payload }: PayloadAction<InitialState>) => {
            Object.assign(state, payload);
        },
        unAuthenticate: (state) => {
            Object.assign(state, initialState);
        },
    },
});

// exporting reducer
export default coreSlice.reducer;

// exporting actions
export const {} = coreSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const authSelector: Selector<RootState, InitialState> = (state: RootState) => state.auth;
