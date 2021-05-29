import { Route, Switch } from 'react-router-dom';
import React, { ReactElement } from 'react';

import '../../styles/core.scss';
import styles from './app.module.scss';

import { Dashboard } from 'layouts/Dashboard/Dashboard';
import { initializeGlobalConfig } from 'config/globalConfig';
import { CommonProvider } from './components/CommonProvider/CommonProvider';
import ThemeProvider from './components/ThemeProvider/ThemeProvider';
import TenantProvider from './components/TenantProvider/TenantProvider';
import AuthProvider from './components/AuthProvider/AuthProvider';
import { NotFound } from 'pages/NotFound/NotFound';
import { ROUTES } from 'config/routes';

// global actions
initializeGlobalConfig();

export const App = (): ReactElement => {
    return (
        <div className={styles.appWrapper}>
            <ThemeProvider>
                <CommonProvider>
                    <TenantProvider>
                        <Switch>
                            <Route path={ROUTES.HOME}>
                                <AuthProvider>
                                    <Dashboard />
                                </AuthProvider>
                            </Route>
                            <Route path={ROUTES.FAIL_SAFE}>
                                <div>
                                    {/* if network issue or other uncaughtable reason like (software service time, this with timer will be show) */}
                                    Fail safe page
                                </div>
                            </Route>
                            <Route>
                                <NotFound />
                            </Route>
                        </Switch>
                    </TenantProvider>
                </CommonProvider>
            </ThemeProvider>
        </div>
    );
};
