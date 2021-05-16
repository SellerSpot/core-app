import { PointOfSale } from 'layouts/PointOfSale/PointOfSale';
import React, { ReactElement } from 'react';
import styles from './dashboard.module.scss';

export const Dashboard = (): ReactElement => {
    return (
        <div className={styles.dashboardWrapper}>
            <div className={styles.leftNavWrapper}>bar</div>
            <div className={styles.bodyWrapper}>
                <div className={styles.topNavWrapper}>top nav wrapper</div>
                <div className={styles.pageBodyWrapper}>
                    <PointOfSale />
                </div>
            </div>
        </div>
    );
};
