import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { IConfirmDialogProps } from '@sellerspot/universal-components';
import { RootState } from '../store';

const initialState: IConfirmDialogProps = {
    active: false,
    className: {
        confirmDialogContentWrapper: '',
        confirmDialogWrapper: '',
        content: '',
    },
    content: null,
    footer: null,
    style: null,
    title: null,
};

const confirmDialogSlice = createSlice({
    name: 'confirmDialog',
    initialState,
    reducers: {
        openConfirmDialog: (
            state,
            { payload }: PayloadAction<Omit<IConfirmDialogProps, 'active'>>,
        ) => {
            Object.assign(state, {
                ...payload,
                active: true,
            } as IConfirmDialogProps);
        },
        closeConfirmDialog: (state) => {
            Object.assign(state, initialState);
        },
    },
});

// exporting reducer
export default confirmDialogSlice.reducer;

// exporting actions
export const { openConfirmDialog, closeConfirmDialog } = confirmDialogSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const confirmDialogSelector: Selector<RootState, IConfirmDialogProps> = (state: RootState) =>
    state.confirmDialog;
