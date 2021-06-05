import React, { ReactElement, useState } from 'react';
import {
    Alert,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    showNotify,
} from '@sellerspot/universal-components';
import styles from './DeleteAccountCard.module.scss';
import { useSelector } from 'react-redux';
import { appSelector } from 'store/models/app';
import DeleteAccountService from './DeleteAccount.service';
import AuthProviderService from 'layouts/App/components/AuthProvider/AuthProvider.service';

export default function DeleteAccountCard(): ReactElement {
    // state
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // hooks
    const {
        tenantDetails: { domainDetails },
    } = useSelector(appSelector);
    const { domainName, url: domainUrl } = domainDetails;

    // handlers
    const onDeleteClickHandler = () => {
        if (!isDeleting) setShowConfirmDialog(true);
    };

    const onConfirmDeleteHandler = async () => {
        setShowConfirmDialog(false);
        setIsDeleting(true);
        const deleteAccountResponse = await DeleteAccountService.deleteAccount();
        if (deleteAccountResponse.status) {
            AuthProviderService.clearApp();
        } else {
            showNotify('Something went wrong, please try again later');
            setIsDeleting(false);
        }
    };

    const getDeleteButtonLabel = () => {
        if (showConfirmDialog) {
            return 'waiting for confirmation';
        } else if (isDeleting) {
            return 'Deleteing your account';
        } else {
            return 'Delete account';
        }
    };

    return (
        <>
            <Card
                className={{
                    cardWrapper: styles.card,
                    contentWrapper: styles.cardContentWrapper,
                }}
                content={
                    <div className={styles.content}>
                        <div className={styles.topContent}>
                            <div className={styles.domainMessage}>
                                <h5>Delete your account</h5>
                                <h6>
                                    <a
                                        href={domainUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={styles.link}
                                    >
                                        {domainName}
                                    </a>
                                </h6>
                            </div>
                            <Button
                                size="medium"
                                theme="danger"
                                variant="contained"
                                label={getDeleteButtonLabel()}
                                onClick={onDeleteClickHandler}
                                isLoading={isDeleting || showConfirmDialog}
                                disabled={isDeleting || showConfirmDialog}
                            />
                        </div>
                        <div className={styles.bottomContent}>
                            <Alert type="error">
                                This is a desctructive operation! All data generated in this account
                                will be deleted permanently
                            </Alert>
                        </div>
                    </div>
                }
            />
            <Dialog open={showConfirmDialog}>
                <DialogTitle>Delete account</DialogTitle>
                <DialogContent>
                    <Alert type="error">
                        This is a desctructive operation! All data generated in this account will be
                        deleted permanently
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        theme="primary"
                        onClick={() => setShowConfirmDialog(false)}
                        label={'Cancel'}
                    />
                    <Button
                        variant="contained"
                        theme="danger"
                        onClick={() => onConfirmDeleteHandler()}
                        label={'Confirm to delete'}
                    />
                </DialogActions>
            </Dialog>
        </>
    );
}
