import React, { ReactElement } from 'react';
import styles from './Settings.module.scss';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import DeleteAccountCard from './components/DeleteAccountCard/DeleteAccountCard';

export const Settings = (): ReactElement => {
    return (
        <div className={styles.wrapper}>
            <PageHeader title="Settings" />
            <div className={styles.bodyWrapper}>
                <DeleteAccountCard />
            </div>
        </div>
    );
};
