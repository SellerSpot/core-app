import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from 'layouts/Home/Home';
import { PointOfSale } from 'layouts/PointOfSale/PointOfSale';
import { Catalogue } from 'layouts/Catalogue/Catalogue';
import { Management } from 'layouts/Management/Management';
import { AppBarManager } from './Components/AppBarManager/AppBarManager';
import styles from './dashboard.module.scss';
import { PluginMenu } from 'components/Compounds/PluginMenu/PluginMenu';
import { ROUTES } from 'config/routes';

export const Dashboard = (): ReactElement => {
    return (
        <div className={styles.dashboardWrapper}>
            <div className={styles.leftNavWrapper}>
                <PluginMenu />
            </div>
            <div className={styles.bodyWrapper}>
                <div className={styles.topNavWrapper}>
                    <AppBarManager />
                </div>
                <div className={styles.pageBodyWrapper}>
                    <Switch>
                        <Route path={ROUTES.MANAGEMENT}>
                            <Management />
                        </Route>
                        <Route path={ROUTES.CATALOGUE}>
                            <Catalogue />
                        </Route>
                        <Route path={ROUTES.POS}>
                            <PointOfSale />
                        </Route>
                        {/* '/' route should be placed atlast */}
                        <Route path={ROUTES.HOME}>
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};
