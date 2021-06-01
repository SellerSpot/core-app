import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { IStoreDetails, IUserDetails } from '@sellerspot/universal-types';
import { RootState } from '../store';
import { cloneDeep } from 'lodash';
import { getActiveStatus } from 'config/activeStatus';

export interface IAppActiveStatus {
    isActive: boolean;
    lastOfflineAt: Date;
    lastOnlineAt: Date;
}
export interface IAppState {
    activeStatus: IAppActiveStatus;
    tenantDetails: IStoreDetails;
    userDetails: IUserDetails;
}

const initialState: IAppState = {
    activeStatus: getActiveStatus(),
    tenantDetails: null,
    userDetails: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateActiveStatus: (state, { payload }: PayloadAction<IAppActiveStatus>) => {
            state.activeStatus = payload;
        },
        updateTenantDetails: (state, { payload }: PayloadAction<IStoreDetails>) => {
            state.tenantDetails = cloneDeep(payload); // to avoid shallow copy to overcome rerender not triggerings issue
        },
        updateUserDetails: (state, { payload }: PayloadAction<IUserDetails>) => {
            state.userDetails = payload;
        },
        resetUserDetails: (state) => {
            state.userDetails = null;
        },
    },
});

// exporting reducer
export default appSlice.reducer;

// exporting actions
export const { updateActiveStatus, updateTenantDetails, updateUserDetails, resetUserDetails } =
    appSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const appSelector: Selector<RootState, IAppState> = (state: RootState) => state.app;
