import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { TRouteKeys } from 'config/routes';
import { RootState } from '../store';

interface InitialState {
    routeKeys?: TRouteKeys[];
    history?: string[]; // for next phase
}

const initialState: InitialState = {
    routeKeys: [], // will be incremented in runtime
    history: [],
};

const routeSlice = createSlice({
    name: 'route',
    initialState,
    reducers: {
        updateRouteKeys: (state, { payload }: PayloadAction<TRouteKeys[]>) => {
            state.routeKeys = payload ?? [];
        },
    },
});

// exporting reducer
export default routeSlice.reducer;

// exporting actions
export const { updateRouteKeys } = routeSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const routeSelector: Selector<RootState, InitialState> = (state: RootState) => state.route;
