import React, { ReactElement } from 'react';
import styles from './Settings.module.scss';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import { CurrencySetting } from './components/CurrencySettings/CurrencySetting';

export const Settings = (): ReactElement => {
    return (
        <div className={styles.wrapper}>
            <PageHeader title="Settings" />
            <div className={styles.bodyWrapper}>
                <CurrencySetting />
            </div>
        </div>
    );
};
