import { ROUTES } from 'config/routes';
import { Home } from 'pages/Home/Home';
import { LeftNavbar } from 'pages/LeftNavbar/LeftNavbar';
import { TopNavbar } from 'pages/TopNavbar/TopNavbar';
import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { getDashboardStyles } from './dashboard.styles';

export const Dashboard = (): ReactElement => {
    const styles = getDashboardStyles();
    return (
        <div className={styles.dashboardWrapper}>
            <div className={styles.leftNavbarWrapper}>
                <LeftNavbar />
            </div>
            <div className={styles.mainBodyWrapper}>
                <div className={styles.topNavbarWrapper}>
                    <TopNavbar />
                </div>
                <div className={styles.coreContentWrapper}>
                    <Switch>
                        <Route path={ROUTES.INSTALLED_APPS}>
                            <Home />
                        </Route>
                        <Route path={ROUTES.APP_STORE}>
                            <Home />
                        </Route>
                        <Route path={ROUTES.BILLING}>
                            <Home />
                        </Route>
                        {/* / route => placing atlast */}
                        <Route path={ROUTES.HOME}>
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};
