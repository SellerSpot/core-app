import React, { ReactElement } from 'react';
import {
    Dialog,
    DialogLayoutWrapper,
    DialogHeader,
    DialogBody,
    Alert,
    DialogFooter,
    Button,
} from '@sellerspot/universal-components';
import { IAlertDialogProps } from './AlertDialog.types';

export const AlertDialog = (props: IAlertDialogProps): ReactElement => {
    // props
    const {
        showDialog,
        content = 'This is sample alert dialog content',
        dialogCloseCallback,
        onBackdropClick,
        primaryButtonProps,
        secondaryButtonProps,
        width,
        theme = 'info',
        title = 'Are you sure?',
    } = props;

    // draw
    return (
        <Dialog showDialog={showDialog} width={width} onBackdropClick={onBackdropClick}>
            <DialogLayoutWrapper>
                <DialogHeader title={title} dialogCloseCallback={dialogCloseCallback} />
                <DialogBody>
                    <Alert type={theme}>{content}</Alert>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="contained"
                        theme="danger"
                        label={'PROCEED'}
                        {...secondaryButtonProps}
                    />
                    <Button
                        variant="outlined"
                        theme="primary"
                        label={'CANCEL'}
                        {...primaryButtonProps}
                    />
                </DialogFooter>
            </DialogLayoutWrapper>
        </Dialog>
    );
};
