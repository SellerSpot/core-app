import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { ROUTES } from 'config/routes';
import { stat } from 'fs';
import { IconType } from 'react-icons/lib';
import { ICONS } from 'utilities/icons';
import { RootState } from '../store';

interface InitialState {
    breadCrumbs: {
        title?: string;
        icon?: IconType;
        route?: string;
    }[];
    lastInserted?: {
        from: number;
        to: number;
    };
}

const initialState: InitialState = {
    breadCrumbs: [],
    lastInserted: {
        from: null,
        to: null,
    },
};

const breadCrumbsSlice = createSlice({
    name: 'breadCrumbs',
    initialState,
    reducers: {
        pushBreadCrumbs: (state, { payload }: PayloadAction<InitialState['breadCrumbs']>) => {
            state.breadCrumbs.push(...payload);
            state.lastInserted.from = state.breadCrumbs.length - payload.length;
            state.lastInserted.to = state.breadCrumbs.length;
        },
        clearAndPushBreadCrumbs: (
            state,
            { payload }: PayloadAction<InitialState['breadCrumbs']>,
        ) => {
            Object.assign(state, {
                breadCrumbs: payload,
            } as InitialState);
        },
        clearBreadCrumbs: (state) => {
            Object.assign(state, initialState);
        },
        removePreviouslyInsertedBreadCrumbs: (state) => {
            if ((state.lastInserted.from ?? false) && (state.lastInserted.from ?? false)) {
                state.breadCrumbs.splice(
                    state.lastInserted.from,
                    state.lastInserted.to - state.lastInserted.from,
                );
                state.lastInserted.from = null;
                state.lastInserted.to = null;
            }
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
    removePreviouslyInsertedBreadCrumbs,
} = breadCrumbsSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const breadCrumbsSelector: Selector<RootState, InitialState> = (state: RootState) =>
    state.breadCrumb;
