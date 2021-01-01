import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { CONFIG } from 'config/config';
import { RootState } from '../store';

export interface IAuthState {
    isAuthenticated: boolean;
    token: string;
    name: string;
    id: string;
    email: string;
    profilePicture: string;
}

const actualInitialstate: IAuthState = {
    isAuthenticated: false,
    token: '',
    name: '',
    id: '',
    email: '',
    profilePicture: '',
};

const getInitialState = (): IAuthState => {
    try {
        const cachedAuthState = localStorage.getItem(CONFIG.REUDX_AUTH_STATE) ?? null;
        if (cachedAuthState) {
            const hydratedAuthState: IAuthState = JSON.parse(cachedAuthState) ?? {};
            if (
                Object.keys(actualInitialstate).length === Object.keys(actualInitialstate).length &&
                hydratedAuthState.id !== undefined
            ) {
                return hydratedAuthState;
            } else {
                throw 'Ivalid Localstore authState';
            }
        }
    } catch (error) {
        // invalid local storage auth state
        // safe clear local storage object
        localStorage.clear();
    }

    return actualInitialstate;
};

const initialState: IAuthState = getInitialState();

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
            localStorage.setItem(CONFIG.REUDX_AUTH_STATE, JSON.stringify(state));
        },
        unAuthenticate: (state) => {
            Object.assign(state, actualInitialstate);
            localStorage.clear();
        },
    },
});

// exporting reducer
export default authSlice.reducer;

// exporting actions
export const { authenticate, unAuthenticate } = authSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const authSelector: Selector<RootState, IAuthState> = (state: RootState) => state.auth;
