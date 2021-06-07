import React, { ReactElement } from 'react';
import { Alert, Card } from '@sellerspot/universal-components';
import styles from './BillingBetaCard.module.scss';

export default function DeleteStoreCard(): ReactElement {
    return (
        <>
            <Card
                className={{
                    cardWrapper: styles.card,
                }}
                content={
                    <div>
                        <Alert type="success" title="Thanks for being a part of beta program!">
                            Your free trial is active, Feel free to install and use all plugins.
                        </Alert>
                    </div>
                }
            />
        </>
    );
}
