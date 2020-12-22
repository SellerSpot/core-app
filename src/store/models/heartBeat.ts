import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialState {
    onlineServerStatus: boolean;
}

const initialState: InitialState = {
    onlineServerStatus: false,
};

const heartBeatSlice = createSlice({
    name: 'hearBeat',
    initialState,
    reducers: {
        updateHeartBeatStatus: (
            state,
            { payload }: PayloadAction<{ onlineServerStatus: boolean }>,
        ) => {
            state.onlineServerStatus = payload.onlineServerStatus;
        },
    },
});

// exporting reducer
export default heartBeatSlice.reducer;

// exporting actions
export const { updateHeartBeatStatus } = heartBeatSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const heartBeatSelector: Selector<RootState, InitialState> = (state: RootState) =>
    state.heartBeat;
