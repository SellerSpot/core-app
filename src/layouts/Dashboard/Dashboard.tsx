import { PointOfSale } from 'layouts/PointOfSale/PointOfSale';
import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router';
import { AppBarManager } from './Components/AppBar/AppBar';
import { WorkSpaceManager } from './Components/WorkspaceManager/WorkspaceManager';
import styles from './dashboard.module.scss';

export const Dashboard = (): ReactElement => {
    return (
        <div className={styles.dashboardWrapper}>
            <div className={styles.leftNavWrapper}>
                <WorkSpaceManager />
            </div>
            <div className={styles.bodyWrapper}>
                <div className={styles.topNavWrapper}>
                    <AppBarManager />
                </div>
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
