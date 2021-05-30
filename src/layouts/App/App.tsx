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
import { FailSafe } from 'pages/FailSafe/FailSafe';

// global actions
initializeGlobalConfig();

export const App = (): ReactElement => {
    return (
        <div className={styles.appWrapper}>
            <ThemeProvider>
                <CommonProvider>
                    <TenantProvider>
                        <Switch>
                            <Route path={ROUTES.FAIL_SAFE}>
                                <FailSafe />
                            </Route>
                            <Route path={ROUTES.NOT_FOUND}>
                                <NotFound />
                            </Route>
                            {/* / route, hence place at last */}
                            <Route path={ROUTES.HOME}>
                                <AuthProvider>
                                    <Dashboard />
                                </AuthProvider>
                            </Route>
                        </Switch>
                    </TenantProvider>
                </CommonProvider>
            </ThemeProvider>
        </div>
    );
};
