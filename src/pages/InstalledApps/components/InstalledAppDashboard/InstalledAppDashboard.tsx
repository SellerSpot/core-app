import { Loader } from 'components/Loader/Loader';
import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { installedAppDashboardService } from 'services/services';
import { pushBreadCrumbs } from 'store/models/breadCrumb';
import { IAppResponse } from 'typings/response.types';
import { ICONS } from 'utilities/icons';
import { getInstalledAppDashboardStyle } from './installedappdashboard.styles';
import { getTenantInstalledAppById } from './installedappsdashboard.actions';
const styles = getInstalledAppDashboardStyle();

export const InstalledAppDashboard = (): ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const [appDetails, setAppDetails] = useState({} as IAppResponse);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const appId = query.get('id');
            if (!appId) throw 'Invalid Url';
            (async () => {
                try {
                    const app = await getTenantInstalledAppById(appId);
                    if (!app) throw 'Invalid Request!';
                    dispatch(
                        pushBreadCrumbs([
                            {
                                icon: ICONS.APP,
                                route: ROUTES.APP_STORE,
                                title: 'Apps',
                            },
                            {
                                icon: ICONS[app.iconUrl as keyof typeof ICONS],
                                route: `${ROUTES.APP_STORE_APPS}/${app._id}`,
                                title: app.name,
                            },
                        ]),
                    );
                    setAppDetails(app);
                    setIsLoading(false);
                } catch (error) {
                    console.error('caught here');
                    history.push(ROUTES.APP_STORE);
                }
            }).call(null);
        } catch (error) {
            console.error(error);
            // show notificaiton
            history.push(ROUTES.APP_STORE);
        }
    }, []);
    const Dashboard = installedAppDashboardService.getAppDashobard(appDetails.name);

    return isLoading ? (
        <Loader />
    ) : (
        <div className={styles.installedAppDashboardWrapper}>
            {/* {JSON.stringify(appDetails, null, 4)} */}
            {Dashboard ? <Dashboard data={appDetails} /> : <Redirect to={ROUTES.INSTALLED_APPS} />}
        </div>
    );
};
