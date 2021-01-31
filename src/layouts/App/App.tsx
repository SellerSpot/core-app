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
import { verifyAuthToken } from './app.actions';
import { animationStyles } from 'styles/animation.styles';
import { notifySelector } from 'store/models/notify';
import { Notify } from '@sellerspot/universal-components';
import '../../styles/core.scss';
import styles from './app.module.scss';

// global actions
initializeGlobalServices(); // application common initilizers goes here

export const App = (): ReactElement => {
    const authState = useSelector(authSelector);
    const [isLoading, setIsLoading] = useState(true);
    const notifyState = useSelector(notifySelector);

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
            <Notify
                notifyId={notifyState.notifyId}
                content={notifyState.content}
                timeout={notifyState.timeOut}
                style={{
                    notifyWrapper: notifyState.styles,
                }}
            />
        </div>
    );
};
