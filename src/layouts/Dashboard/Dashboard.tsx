import { ROUTES } from 'config/routes';
import { AppStore } from 'pages/AppStore/AppStore';
import { Billing } from 'pages/Billing/Billing';
import { SubDomainSetup } from 'pages/SubDomainSetup/SubDomainSetup';
import { Home } from 'pages/Home/Home';
import { InstalledApps } from 'pages/InstalledApps/InstalledApps';
import { LeftNavbar } from 'pages/LeftNavbar/LeftNavbar';
import { Notifications } from 'pages/Notifications/Notifications';
import { Settings } from 'pages/Settings/Settings';
import { TopNavbar } from 'pages/TopNavbar/TopNavbar';
import React, { ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getDashboardStyles } from './dashboard.styles';
import { useSelector } from 'react-redux';
import { subDomainSelector } from 'store/models/subDomain';

export const Dashboard = (): ReactElement => {
    const styles = getDashboardStyles();
    const subDomainState = useSelector(subDomainSelector);

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
                            <InstalledApps />
                        </Route>
                        <Route path={ROUTES.APP_STORE}>
                            <AppStore />
                        </Route>
                        <Route path={ROUTES.BILLING}>
                            <Billing />
                        </Route>
                        <Route path={ROUTES.SETTINGS}>
                            <Settings />
                        </Route>
                        <Route path={ROUTES.NOTIFICATIONS}>
                            <Notifications />
                        </Route>
                        <Route path={ROUTES.SUB_DOMAIN_SETUP}>
                            <SubDomainSetup />
                        </Route>
                        {/* / route => placing atlast */}
                        <Route path={ROUTES.HOME}>
                            {subDomainState.registered ? (
                                <Home />
                            ) : (
                                <Redirect to={ROUTES.SUB_DOMAIN_SETUP} />
                            )}
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};
