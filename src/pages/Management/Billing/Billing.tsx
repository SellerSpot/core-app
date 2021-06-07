import React, { ReactElement } from 'react';
import styles from './Billing.module.scss';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import BillingBetaCard from './components/BillingBetaCard/BillingBetaCard';

export const Billing = (): ReactElement => {
    return (
        <div className={styles.wrapper}>
            <PageHeader title="Billing" />
            <div className={styles.bodyWrapper}>
                <BillingBetaCard />
            </div>
        </div>
    );
};
