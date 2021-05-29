import { IconifyIcon } from '@iconify/react';
import { createSlice, Selector } from '@reduxjs/toolkit';
import { ROUTES, TRouteKeys } from 'config/routes';
import { ICONS } from 'utilities/utilities';
import { RootState } from '../store';

interface IWorkSpace {
    /**
     * Title for the WorkSpaceTile
     */
    title: string;
    /**
     * Icon for the WorkSpaceTile
     */
    icon: IconifyIcon['icon'];
    /**
     * Redirect route for the WorkSpaceTile
     */
    redirectRoute: string;
    /**
     * Route key to uniquely identify each route
     */
    routeKey: TRouteKeys;
    /**
     * To denote if the current workspace is active
     */
    active: boolean;
}

export interface IWorkSpaceState {
    workspaces: IWorkSpace[];
}

const initialState: IWorkSpaceState = {
    workspaces: [
        {
            icon: ICONS.homeVariant,
            title: 'Home',
            routeKey: 'HOME',
            redirectRoute: ROUTES.HOME,
            active: true,
        },
        {
            icon: ICONS.settingsIcon,
            title: 'Management',
            routeKey: 'MANAGEMENT',
            redirectRoute: ROUTES.MANAGEMENT,
            active: true,
        },
        {
            icon: ICONS.cashRegister,
            title: 'Point of Sale',
            routeKey: 'POS',
            redirectRoute: ROUTES.POS,
            active: true,
        },
        {
            icon: ICONS.outlineListAlt,
            title: 'Catalogue',
            routeKey: 'CATALOGUE',
            redirectRoute: ROUTES.CATALOGUE,
            active: true,
        },
    ],
};

const workSpaceSlice = createSlice({
    name: 'workspaces',
    initialState,
    reducers: {},
});

// exporting reducer
export default workSpaceSlice.reducer;

// exporting actions
export const {} = workSpaceSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const workSpaceSelector: Selector<RootState, IWorkSpaceState> = (state: RootState) =>
    state.workspace;
