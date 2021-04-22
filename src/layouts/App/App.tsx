import cn from 'classnames';
import React, { ReactElement, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { initializeGlobalServices } from 'config/globalConfig';
import { ROUTES } from 'config/routes';
import { Dashboard } from 'layouts/Dashboard/Dashboard';

import styles from './app.module.scss';

// global actions
initializeGlobalServices(); // application common initilizers goes here

export const App = (): ReactElement => {
    const [appLoading] = useState(true);

    return (
        <div className={styles.appWrapper}>
            {appLoading ? (
                <h6>Loading</h6>
            ) : (
                <div className={cn(styles.appContainer)}>
                    <Switch>
                        {/* all other routes should be nested above this route because it is '/' route hence should be placed atlast */}
                        <Route path={ROUTES.DASHBOARD}>
                            <Dashboard />
                        </Route>
                    </Switch>
                </div>
            )}
            {/* globally available components */}
        </div>
    );
};
