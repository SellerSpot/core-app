import { ROUTES } from 'config/routes';
import { Home } from 'layouts/Home/Home';
import { PointOfSale } from 'layouts/PointOfSale/PointOfSale';
import { Catalogue } from 'layouts/Catalogue/Catalogue';
import { Management } from 'layouts/Management/Management';
import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router';
import { AppBarManager } from './Components/AppBar/AppBar';
import styles from './dashboard.module.scss';
import { WorkSpaceMenu } from 'components/Compounds/WorkSpaceMenu/WorkSpaceMenu';

export const Dashboard = (): ReactElement => {
    return (
        <div className={styles.dashboardWrapper}>
            <div className={styles.leftNavWrapper}>
                <WorkSpaceMenu />
            </div>
            <div className={styles.bodyWrapper}>
                <div className={styles.topNavWrapper}>
                    <AppBarManager />
                </div>
                <div className={styles.pageBodyWrapper}>
                    <Switch>
                        <Route path={ROUTES.MANAGEMENT.DEFAULT}>
                            <Management />
                        </Route>
                        <Route path={ROUTES.CATALOGUE.DEFAULT}>
                            <Catalogue />
                        </Route>
                        <Route path={ROUTES.POS.DEFAULT}>
                            <PointOfSale />
                        </Route>
                        {/* / route should be placed atlast */}
                        <Route path={ROUTES.HOME}>
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};
