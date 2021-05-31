import { AppBar } from 'components/Compounds/AppBar/AppBar';
import { PluginMenu } from 'components/Compounds/PluginMenu/PluginMenu';
import { ROUTES } from 'config/routes';
import { Catalogue } from 'layouts/Catalogue/Catalogue';
import { Home } from 'layouts/Home/Home';
import { Management } from 'layouts/Management/Management';
import { PointOfSale } from 'layouts/PointOfSale/PointOfSale';
import React, { ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styles from './dashboard.module.scss';

export const Dashboard = (): ReactElement => {
    return (
        <div className={styles.dashboardWrapper}>
            <div className={styles.leftNavWrapper}>
                <PluginMenu />
            </div>
            <div className={styles.bodyWrapper}>
                <div className={styles.topNavWrapper}>
                    <AppBar />
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
                        <Route exact path={ROUTES.HOME}>
                            <Home />
                        </Route>
                        <Route>
                            <Redirect to={ROUTES.NOT_FOUND} />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};
