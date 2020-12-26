import { Loader } from 'components/Loader/Loader';
import { initializeGlobalServices } from 'config/globalConfig';
import { ROUTES } from 'config/routes';
import animationStyles from './styles/animations.module.css';
import { Auth } from 'layouts/Auth/Auth';
import { Dashboard } from 'layouts/Dashboard/Dashboard';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { authSelector, unAuthenticate } from 'store/models/auth';
import { socketService } from './services';
import './styles/index.css';
import cn from 'classnames';

// application common initilizers goes here
initializeGlobalServices();

export const App = (): ReactElement => {
    const authState = useSelector(authSelector);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyAuthToken = async () => {
            try {
                if (authState.isAuthenticated) {
                    const response = await socketService.request('AUTH_VERIFY_TOKEN');
                    if (!response.status) {
                        // previously authenticated and token expired or not found state - clearing auth state(loging out the user)
                        throw response;
                    }
                }
            } catch (error) {
                // show some message that relogin again - login expired
                dispatch(unAuthenticate());
            }
            setIsLoading(false);
        };
        verifyAuthToken();
    }, []);

    return (
        <div className={'baseWrapper'}>
            {isLoading ? (
                <Loader />
            ) : (
                <div
                    className={cn(
                        'baseContainer',
                        animationStyles.animateFadeIn,
                        animationStyles.durationPt5s,
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
