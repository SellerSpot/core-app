import { createState, State, useState } from '@hookstate/core';
import {
    Alert,
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    DialogLayoutWrapper,
} from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import {
    IConfirmDialogProps,
    IConfirmDialogState,
    IConfirmDialogStateActions,
} from './ConfirmDialog.types';

const confirmDialogState = createState<IConfirmDialogState>({
    show: false,
    props: {},
    reject: null,
    resolve: null,
});

const confirmDialogStateActions = (state: State<Partial<IConfirmDialogState>>) => ({
    confirm: (props: IConfirmDialogProps) => {
        return new Promise<void>((resolve, reject) => {
            state.merge({
                show: true,
                reject,
                resolve,
                props,
            });
        });
    },
});

export const useConfirmDialog = (): IConfirmDialogStateActions =>
    confirmDialogStateActions(useState(confirmDialogState));

export const ConfirmDialog = (): ReactElement => {
    // state
    const state = useState(confirmDialogState);
    const props = state.get().props;
    const {
        content = 'This is sample alert dialog content',
        dialogCloseCallback,
        onBackdropClick,
        primaryButtonProps,
        secondaryButtonProps,
        width,
        theme = 'info',
        title = 'Are you sure?',
    } = props;

    // handlers
    const handlePrimaryButtonOnClick = () => {
        state.show.set(false);
        state.resolve.get()();
    };
    const handleSecondaryButtonOnClick = () => {
        state.show.set(false);
        state.reject.get()();
    };

    // draw
    return (
        <Dialog showDialog={state.show.get()} width={width} onBackdropClick={onBackdropClick}>
            <DialogLayoutWrapper>
                <DialogHeader title={title} dialogCloseCallback={dialogCloseCallback} />
                <DialogBody>
                    <Alert type={theme}>{content}</Alert>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="outlined"
                        theme="danger"
                        label={'CANCEL'}
                        {...secondaryButtonProps}
                        onClick={handleSecondaryButtonOnClick}
                    />
                    <Button
                        variant="contained"
                        theme="primary"
                        label={'PROCEED'}
                        {...primaryButtonProps}
                        onClick={handlePrimaryButtonOnClick}
                    />
                </DialogFooter>
            </DialogLayoutWrapper>
        </Dialog>
    );
};
