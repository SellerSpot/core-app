import {
    Alert,
    Button,
    Card,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    DialogLayoutWrapper,
    showNotify,
} from '@sellerspot/universal-components';
import AuthProviderService from 'layouts/App/components/AuthProvider/AuthProvider.service';
import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { appSelector } from 'store/models/app';
import DeleteStoreService from './DeleteStore.service';
import styles from './DeleteStoreCard.module.scss';

export default function DeleteStoreCard(): ReactElement {
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
        const deleteStoreResponse = await DeleteStoreService.deleteStore();
        if (deleteStoreResponse.status) {
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
            return 'Deleteing your store';
        } else {
            return 'Delete store';
        }
    };

    const alertMessage = `This is a desctructive operation! All data generated in this store
    will be deleted permanently`;

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
                                <h5>Delete your store</h5>
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
                            <Alert type="error">{alertMessage}</Alert>
                        </div>
                    </div>
                }
            />
            <Dialog showDialog={showConfirmDialog}>
                <DialogLayoutWrapper>
                    <DialogHeader title={'Delete Store'} />
                    <DialogBody>
                        <Alert type="error">{alertMessage}</Alert>
                    </DialogBody>
                    <DialogFooter>
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
                    </DialogFooter>
                </DialogLayoutWrapper>
            </Dialog>
        </>
    );
}
