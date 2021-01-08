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
import { ConfirmDialog, Notify } from '@sellerspot/universal-components';
import { confirmDialogSelector } from 'store/models/confirmDialog';

// global actions
injectGlobalStyles(); // inject global styles into dom
initializeGlobalServices(); // application common initilizers goes here

export const App = (): ReactElement => {
    const styles = getAppStyles();
    const authState = useSelector(authSelector);
    const [isLoading, setIsLoading] = useState(true);
    const confirmDialogState = useSelector(confirmDialogSelector);

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
                        animationStyles.compose.animate('fadeIn'),
                        animationStyles.compose.duration(1.5),
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
            {/* global components */}
            {/* <ConfirmDialog {...confirmDialogState} />
            <Notify
                active={true}
                content={<div>Hello</div>}
                timeout={2}
                clearNotificationCallback={() => {}}
            /> */}
        </div>
    );
};
