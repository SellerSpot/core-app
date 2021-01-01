import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { ROUTES } from 'config/routes';
import { IconType } from 'react-icons/lib';
import { ICONS } from 'utilities/icons';
import { RootState } from '../store';

interface InitialState {
    breadCrumbs: {
        title?: string;
        icon?: IconType;
        route?: string;
    }[];
}

const initialState: InitialState = {
    breadCrumbs: [
        {
            icon: ICONS.HOME,
            title: 'Home',
            route: ROUTES.HOME,
        },
        {
            icon: ICONS.BILLING,
            title: 'fashioin sale!',
            route: ROUTES.APP_STORE,
        },
    ],
};

const breadCrumbsSlice = createSlice({
    name: 'breadCrumbs',
    initialState,
    reducers: {
        pushBreadCrumbs: (state, { payload }: PayloadAction<Pick<InitialState, 'breadCrumbs'>>) => {
            state.breadCrumbs.push(...payload.breadCrumbs);
        },
        clearAndPushBreadCrumbs: (
            state,
            { payload }: PayloadAction<Pick<InitialState, 'breadCrumbs'>>,
        ) => {
            Object.assign(state, {
                breadCrumbs: payload.breadCrumbs,
            } as InitialState);
        },
        clearBreadCrumbs: (state) => {
            Object.assign(state, initialState);
        },
    },
});

// exporting reducer
export default breadCrumbsSlice.reducer;

// exporting actions
export const {
    pushBreadCrumbs,
    clearAndPushBreadCrumbs,
    clearBreadCrumbs,
} = breadCrumbsSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const breadCrumbsSelector: Selector<RootState, InitialState> = (state: RootState) =>
    state.breadCrumb;