import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialState {
    route_match?: {
        level_0?: string;
        level_1?: string;
        level_2?: string;
        level_3?: string;
    };
    history?: string[];
}

const initialState: InitialState = {
    route_match: {
        level_0: '',
    },
    history: [],
};

const routeSlice = createSlice({
    name: 'route',
    initialState,
    reducers: {
        updateRouteeState: (state, { payload }: PayloadAction<InitialState>) => {
            (<(keyof InitialState)[]>Object.keys(payload)).map(() => {
                if (state) {
                    // do actions here
                }
            });
        },
        resetRouteeState: (state) => {
            Object.assign(state, initialState);
        },
    },
});

// exporting reducer
export default routeSlice.reducer;

// exporting actions
export const { updateRouteeState, resetRouteeState } = routeSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const routeSelector: Selector<RootState, InitialState> = (state: RootState) => state.route;
