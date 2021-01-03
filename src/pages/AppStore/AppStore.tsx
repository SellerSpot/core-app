import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { clearAndPushBreadCrumbs } from 'store/models/breadCrumb';
import { ICONS } from 'utilities/icons';
import { getAppStoreStyles } from './appstore.styles';
import { AppEnlargedView } from './components/AppEnlargedView/AppEnlargedView';
import { AppStoreHome } from './components/AppStoreHome/AppStoreHome';
const styles = getAppStoreStyles();

export const AppStore = (): ReactElement => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            clearAndPushBreadCrumbs([
                {
                    icon: ICONS.APP_STORE,
                    route: ROUTES.APP_STORE,
                    title: 'App Store',
                },
            ]),
        );
    }, []);

    return (
        <div className={styles.appstoreWrapper}>
            <Switch>
                <Route path={`${ROUTES.APP_STORE_APPS}/:id`}>
                    <AppEnlargedView />
                </Route>

                {/* slash routes hence should be place at bottom */}
                <Route path={ROUTES.APP_STORE}>
                    <AppStoreHome />
                </Route>
            </Switch>
        </div>
    );
};
