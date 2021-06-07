import React, { ReactElement } from 'react';
import styles from './Settings.module.scss';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import DeleteStoreCard from './components/DeleteStoreCard/DeleteStoreCard';

export const Settings = (): ReactElement => {
    return (
        <div className={styles.wrapper}>
            <PageHeader title="Settings" />
            <div className={styles.bodyWrapper}>
                <DeleteStoreCard />
            </div>
        </div>
    );
};
