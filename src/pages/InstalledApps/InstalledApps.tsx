import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { clearAndPushBreadCrumbs } from 'store/models/breadCrumb';
import { ICONS } from 'utilities/icons';
import { InstalledAppsHome } from './components/InstalledAppsHome/InstalledAppsHome';
import { getInstalledAppsStyles } from './installedapps.styles';
const styles = getInstalledAppsStyles();

export const InstalledApps = (): ReactElement => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            clearAndPushBreadCrumbs([
                {
                    icon: ICONS.INSTALLED_APPS,
                    route: ROUTES.INSTALLED_APPS,
                    title: 'Installed Apps',
                },
            ]),
        );
    }, []);
    return (
        <div className={styles.installedAppsWrapper}>
            <Switch>
                {/* this is / route, should be placed at bottom */}
                <Route path={[ROUTES.INSTALLED_APPS, ROUTES.INSTALLED_APPS_HOME]}>
                    <InstalledAppsHome />
                </Route>
            </Switch>
        </div>
    );
};
