import { Route, Switch } from 'react-router-dom';
import React, { ReactElement } from 'react';

import '../../styles/core.scss';
import styles from './app.module.scss';

import { Dashboard } from 'layouts/Dashboard/Dashboard';
import { ROUTES } from 'config/routes';
import { initializeGlobalConfig } from 'config/globalConfig';
import { CommonProvider } from './components/CommonProvider/CommonProvider';
import ThemeProvider from './components/ThemeProvider/ThemeProvider';
import TenantProvider from './components/TenantProvider/TenantProvider';
import AuthProvider from './components/AuthProvider/AuthProvider';

// global actions
initializeGlobalConfig();

export const App = (): ReactElement => {
    return (
        <div className={styles.appWrapper}>
            <ThemeProvider>
                <CommonProvider>
                    <TenantProvider>
                        <AuthProvider>
                            <Switch>
                                <Route path={ROUTES.DASHBOARD}>
                                    <Dashboard />
                                </Route>
                            </Switch>
                        </AuthProvider>
                    </TenantProvider>
                </CommonProvider>
            </ThemeProvider>
        </div>
    );
};
