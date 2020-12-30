import { Loader } from 'components/Loader/Loader';
import { initializeGlobalServices } from 'config/globalConfig';
import { ROUTES } from 'config/routes';
import { Auth } from 'layouts/Auth/Auth';
import { Dashboard } from 'layouts/Dashboard/Dashboard';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { authSelector } from 'store/models/auth';
import { cx } from '@emotion/css';
import { getAppStyles } from './app.styles';
import { verifyAuthToken } from './app.actions';
import { injectGlobalStyles } from 'styles/styles';
import { animationStyles } from 'styles/animation.styles';

// global actions
injectGlobalStyles(); // inject global styles into dom
initializeGlobalServices(); // application common initilizers goes here

export const App = (): ReactElement => {
    const styles = getAppStyles();
    const authState = useSelector(authSelector);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await verifyAuthToken();
            setIsLoading(false);
        }).call(null);
    }, []);

    return (
        <div className={styles.appWrapper}>
            {isLoading ? (
                <Loader />
            ) : (
                <div
                    className={cx(
                        styles.appContainer,
                        animationStyles.names.fadeIn,
                        animationStyles.durations.onePointFiveSecond,
                    )}
                >
                    <Switch>
                        <Route path={ROUTES.Auth}>
                            {!authState.isAuthenticated ? (
                                <Auth />
                            ) : (
                                <Redirect to={ROUTES.DASHBOARD} />
                            )}
                        </Route>
                        {/* all other routes should be nested above this route because it is '/' route hence should be placed atlast */}
                        <Route path={ROUTES.DASHBOARD}>
                            {authState.isAuthenticated ? (
                                <Dashboard />
                            ) : (
                                <Redirect to={ROUTES.Auth} />
                            )}
                        </Route>
                    </Switch>
                </div>
            )}
        </div>
    );
};
