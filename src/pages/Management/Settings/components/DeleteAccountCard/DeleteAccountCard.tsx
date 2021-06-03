import React, { ReactElement } from 'react';
import { Alert, Button, Card } from '@sellerspot/universal-components';
import styles from './DeleteAccountCard.module.scss';
import { useSelector } from 'react-redux';
import { appSelector } from 'store/models/app';

export default function DeleteAccountCard(): ReactElement {
    // hooks
    const {
        tenantDetails: { domainDetails },
    } = useSelector(appSelector);
    const { domainName, url: domainUrl } = domainDetails;

    // handlers
    const deleteClickHandler = () => {
        // show confirm dialog and trigger delete
        // add loader
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
                                label={'Delete account'}
                                onClick={deleteClickHandler}
                            />
                        </div>
                        <div className={styles.bottomContent}>
                            <Alert type={'error'}>
                                This is a desctructive operation! All data generated in this account
                                will be deleted permanently
                            </Alert>
                        </div>
                    </div>
                }
            />
        </>
    );
}
