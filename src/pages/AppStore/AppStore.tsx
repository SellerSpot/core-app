import { ROUTES } from 'config/routes';
import { getTenantInstalledApps } from 'pages/InstalledApps/installedapps.actions';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import {
    clearAndPushBreadCrumbs,
    removePreviouslyInsertedBreadCrumbs,
} from 'store/models/breadCrumb';
import { updateInstalledAppsState } from 'store/models/installedApps';
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
        (async () => {
            const installedApps = await getTenantInstalledApps();
            dispatch(updateInstalledAppsState({ apps: installedApps }));
        }).call(null);

        return () => {
            dispatch(removePreviouslyInsertedBreadCrumbs());
        };
    }, []);

    return (
        <div className={styles.appstoreWrapper}>
            <Switch>
                <Route path={`${ROUTES.APP_STORE_APP}`}>
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
