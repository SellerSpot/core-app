import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { CONFIG } from 'config/config';
import { RootState } from '../store';

export interface ISubDomainState {
    registered: boolean;
    domainName: string;
    id: string;
    baseDomain?: string;
}

const actualInitialState: ISubDomainState = {
    registered: false,
    domainName: '',
    id: '',
    baseDomain: '',
};

const getInitialState = (): ISubDomainState => {
    try {
        const cachedAuthState = localStorage.getItem(CONFIG.REUDX_SUB_DOMAIN_STATE) ?? null;
        if (cachedAuthState) {
            const hydratedAuthState: ISubDomainState = JSON.parse(cachedAuthState) ?? {};
            if (
                Object.keys(actualInitialState).length === Object.keys(actualInitialState).length &&
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
        localStorage.removeItem(CONFIG.REUDX_SUB_DOMAIN_STATE);
    }

    return actualInitialState;
};

const initialState: ISubDomainState = getInitialState();

const subDomainSlice = createSlice({
    name: 'subDomain',
    initialState,
    reducers: {
        updateSubDomain: (
            state,
            { payload }: PayloadAction<Omit<ISubDomainState, 'registered'>>,
        ) => {
            Object.assign(state, {
                ...payload,
                registered: payload.id ? true : false,
            } as ISubDomainState);
            localStorage.setItem(CONFIG.REUDX_SUB_DOMAIN_STATE, JSON.stringify(state));
        },
        clearSubDomain: (state) => {
            Object.assign(state, actualInitialState);
            localStorage.removeItem(CONFIG.REUDX_SUB_DOMAIN_STATE);
        },
    },
});

// exporting reducer
export default subDomainSlice.reducer;

// exporting actions
export const { updateSubDomain, clearSubDomain } = subDomainSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const subDomainSelector: Selector<RootState, ISubDomainState> = (state: RootState) =>
    state.subDomain;
