import { Route, Switch } from 'react-router-dom';
import React, { ReactElement } from 'react';
import { Dashboard } from 'layouts/Dashboard/Dashboard';
import { ROUTES } from 'config/routes';
import { initializeGlobalServices } from 'config/globalConfig';
import styles from './app.module.scss';
import { CommonProvider } from './components/CommonProvider/CommonProvider';
import ThemeProvider from './components/ThemeProvider/ThemeProvider';
import { GlobalLoader } from './components/GlobalLoader/GlobalLoader';

// global actions
initializeGlobalServices(); // application common initilizers goes here

export const App = (): ReactElement => {
    return (
        <div className={styles.appWrapper}>
            <ThemeProvider>
                <CommonProvider>
                    <GlobalLoader>
                        {/* <TenantProvider>
                        <AuthProvider> */}
                        <Switch>
                            <Route path={ROUTES.DASHBOARD}>
                                <Dashboard />
                            </Route>
                        </Switch>
                        {/* </AuthProvider>
                    </TenantProvider> */}
                    </GlobalLoader>
                </CommonProvider>
            </ThemeProvider>
        </div>
    );
};
