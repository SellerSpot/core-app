import { PointOfSale } from 'layouts/PointOfSale/PointOfSale';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import { appSelector } from 'store/models/app';
import { WorkSpaceManager } from './Components/WorkspaceManager/WorkspaceManager';
import styles from './dashboard.module.scss';

export const Dashboard = (): ReactElement => {
    const {
        activeStatus: { isActive, lastOfflineAt, lastOnlineAt },
    } = useSelector(appSelector);
    return (
        <div className={styles.dashboardWrapper}>
            <div className={styles.leftNavWrapper}>
                <WorkSpaceManager />
            </div>
            <div className={styles.bodyWrapper}>
                <div className={styles.topNavWrapper}>
                    status: {isActive ? 'online' : 'offline'}&nbsp; lastOnlineAt:
                    {lastOnlineAt.toLocaleTimeString()}&nbsp; lastOfflineAt:
                    {lastOfflineAt.toLocaleTimeString()}
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
