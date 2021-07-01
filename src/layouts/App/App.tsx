import { initializeGlobalConfig } from 'config/globalConfig';
import { ROUTES } from 'config/routes';
import { Dashboard } from 'layouts/Dashboard/Dashboard';
import { FailSafe } from 'pages/FailSafe/FailSafe';
import { NotFound } from 'pages/NotFound/NotFound';
import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../../styles/core.scss';
import styles from './app.module.scss';
import AuthProvider from './components/AuthProvider/AuthProvider';
import { CommonProvider } from './components/CommonProvider/CommonProvider';
import { Dialogs } from './components/GlobalComponents/Dialogs';
import TenantProvider from './components/TenantProvider/TenantProvider';
import ThemeProvider from './components/ThemeProvider/ThemeProvider';

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
                        <Dialogs />
                    </TenantProvider>
                </CommonProvider>
            </ThemeProvider>
        </div>
    );
};
