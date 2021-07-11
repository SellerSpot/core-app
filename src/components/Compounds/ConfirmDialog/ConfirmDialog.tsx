import { createState, State, useState } from '@hookstate/core';
import {
    Alert,
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    DialogLayoutWrapper,
    IDialogHeaderProps,
} from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import {
    IConfirmDialogProps,
    IConfirmDialogState,
    IConfirmDialogStateActions,
} from './ConfirmDialog.types';

const confirmDialogStateInitialValues: IConfirmDialogState = {
    show: false,
    isLoading: false,
    props: {},
    reject: null,
    resolve: null,
};

const confirmDialogState = createState<IConfirmDialogState>(confirmDialogStateInitialValues);

const confirmDialogStateActions = (state: State<Partial<IConfirmDialogState>>) =>
    ({
        confirm: (props: IConfirmDialogProps) => {
            return new Promise<boolean>((resolve, reject) => {
                state.merge({
                    show: true,
                    reject,
                    resolve,
                    props,
                });
            });
        },
        closeDialog: () => {
            // settting state
            state.merge({
                show: false,
                isLoading: false,
                reject: null,
                resolve: null,
            });
        },
        setLoading: (props) => {
            // props
            const { isLoading } = props;
            // setting state
            state.isLoading.set(isLoading);
        },
    } as IConfirmDialogStateActions);

// to invoke dialog outside a component
export const accessConfirmDialog = (): IConfirmDialogStateActions =>
    confirmDialogStateActions(confirmDialogState);

// to invoke dialog inside a component
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
        state.resolve.get()(true);
    };
    const handleSecondaryButtonOnClick = () => {
        state.resolve.get()(false);
    };
    const handleDialogCloseCallback: IDialogHeaderProps['dialogCloseCallback'] = (event) => {
        state.resolve.get()(false);
        dialogCloseCallback(event);
    };

    // draw
    return (
        <Dialog showDialog={state.show.get()} width={width} onBackdropClick={onBackdropClick}>
            <DialogLayoutWrapper>
                <DialogHeader title={title} dialogCloseCallback={handleDialogCloseCallback} />
                <DialogBody>
                    <Alert type={theme}>{content}</Alert>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="outlined"
                        theme="danger"
                        label={'CANCEL'}
                        disabled={state.isLoading.get()}
                        onClick={handleSecondaryButtonOnClick}
                        {...secondaryButtonProps}
                    />
                    <Button
                        variant="contained"
                        theme="primary"
                        label={'PROCEED'}
                        isLoading={state.isLoading.get()}
                        onClick={handlePrimaryButtonOnClick}
                        {...primaryButtonProps}
                    />
                </DialogFooter>
            </DialogLayoutWrapper>
        </Dialog>
    );
};
