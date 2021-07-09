import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import {
    IInstalledPlugin,
    IStoreCurrency,
    IStoreDetails,
    IUserDetails,
} from '@sellerspot/universal-types';

import { RootState } from '../store';
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
        updateInstalledPlugins: (state, { payload }: PayloadAction<IInstalledPlugin[]>) => {
            state.tenantDetails.installedPlugins = payload;
        },
        updateStoreCurrency: (state, { payload }: PayloadAction<IStoreCurrency>) => {
            state.tenantDetails.storeCurrency = payload;
        },
        resetUserDetails: (state) => {
            state.userDetails = null;
        },
        resetAppState: (state) => {
            state.userDetails = null;
            state.tenantDetails = null;
        },
    },
});

// exporting reducer
export default appSlice.reducer;

// exporting actions
export const {
    updateActiveStatus,
    updateTenantDetails,
    updateUserDetails,
    updateInstalledPlugins,
    resetUserDetails,
    resetAppState,
    updateStoreCurrency,
} = appSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const appSelector: Selector<RootState, IAppState> = (state: RootState) => state.app;
export const tenantSelector: Selector<RootState, IStoreDetails> = (state: RootState) =>
    state.app.tenantDetails;
export const userSelector: Selector<RootState, IUserDetails> = (state: RootState) =>
    state.app.userDetails;
