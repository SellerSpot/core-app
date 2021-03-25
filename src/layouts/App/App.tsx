import { initializeGlobalServices } from 'config/globalConfig';
import { ROUTES } from 'config/routes';
import { Dashboard } from 'layouts/Dashboard/Dashboard';
import React, { ReactElement, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import cn from 'classnames';
import '../../styles/core.scss';
import styles from './app.module.scss';
import { CircularProgress } from '@material-ui/core';

// global actions
initializeGlobalServices(); // application common initilizers goes here

export const App = (): ReactElement => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(false);
        }).call(null);
    }, []);

    return (
        <div className={styles.appWrapper}>
            {isLoading ? (
                <CircularProgress />
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
            {/* global components */}
        </div>
    );
};
