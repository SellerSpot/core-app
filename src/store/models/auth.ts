import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface IAuthState {
    isAuthenticated: boolean;
    token: string;
    name: string;
    id: string;
    email: string;
    profilePicture: string;
}

const initialState: IAuthState = {
    isAuthenticated: false,
    token: '',
    name: '',
    id: '',
    email: '',
    profilePicture: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticate: (
            state,
            { payload }: PayloadAction<Omit<IAuthState, 'isAuthenticated' | 'profilePicture'>>,
        ) => {
            state.isAuthenticated = true;
            state.profilePicture = '';
            Object.assign(state, payload);
        },
        unAuthenticate: (state) => {
            Object.assign(state, initialState);
        },
    },
});

// exporting reducer
export default authSlice.reducer;

// exporting actions
export const { authenticate, unAuthenticate } = authSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const authSelector: Selector<RootState, IAuthState> = (state: RootState) => state.auth;
