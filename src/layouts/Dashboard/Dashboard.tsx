import { PointOfSale } from 'layouts/PointOfSale/PointOfSale';
import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router';
import styles from './dashboard.module.scss';

export const Dashboard = (): ReactElement => {
    return (
        <div className={styles.dashboardWrapper}>
            <div className={styles.leftNavWrapper}>wk bar</div>
            <div className={styles.bodyWrapper}>
                <div className={styles.topNavWrapper}>top nav wrapper</div>
                <div className={styles.pageBodyWrapper}>
                    <Switch>
                        <Route>
                            <PointOfSale />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};
