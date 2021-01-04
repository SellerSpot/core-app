import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { IAppResponse } from 'typings/response.types';
import { RootState } from '../store';

interface IInstalledAppState {
    apps: IAppResponse[];
    appIds: string[];
}

const initialState: IInstalledAppState = {
    apps: [],
    appIds: [],
};

const installedApps = createSlice({
    name: 'installedApps',
    initialState,
    reducers: {
        updateInstalledAppsState: (
            state,
            { payload }: PayloadAction<Pick<IInstalledAppState, 'apps'>>,
        ) => {
            state.apps = payload.apps;
            state.appIds = payload.apps.map((app) => app._id);
        },
    },
});

// exporting reducer
export default installedApps.reducer;

// exporting actions
export const { updateInstalledAppsState } = installedApps.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const installedAppsSelector: Selector<RootState, IInstalledAppState> = (state: RootState) =>
    state.installedApps;
