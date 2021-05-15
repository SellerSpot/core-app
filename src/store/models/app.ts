import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { IStoreDetails, IUserDetails } from '@sellerspot/universal-types';
import { RootState } from '../store';
import { cloneDeep } from 'lodash';

interface InitialState {
    tenantDetails: IStoreDetails;
    userDetails: IUserDetails;
}

const initialState: InitialState = {
    tenantDetails: null,
    userDetails: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateTenantDetails: (state, { payload }: PayloadAction<IStoreDetails>) => {
            state.tenantDetails = cloneDeep(payload);
        },
        updateUserDetails: (state, { payload }: PayloadAction<IUserDetails>) => {
            state.userDetails = payload;
        },
    },
});

// exporting reducer
export default appSlice.reducer;

// exporting actions
export const { updateTenantDetails, updateUserDetails } = appSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const appSelector: Selector<RootState, InitialState> = (state: RootState) => state.app;
