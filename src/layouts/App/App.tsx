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
                        <Switch>
                            <Route path={ROUTES.HOME}>
                                <AuthProvider>
                                    <Dashboard />
                                </AuthProvider>
                            </Route>
                            <Route path={ROUTES.FAIL_SAFE}>
                                <div>
                                    Fail safe page
                                    {/* if network issue or other uncaughtable reason like (software service time, this with timer will be show) */}
                                </div>
                            </Route>
                            <Route>
                                <div>
                                    Not found page
                                    {/* notify user - that he tried to access the page that is not available - 
                                            redirect to the page that he came from, or if he directly hits not found page, redirect to dashboard
                                    */}
                                </div>
                            </Route>
                        </Switch>
                    </TenantProvider>
                </CommonProvider>
            </ThemeProvider>
        </div>
    );
};
