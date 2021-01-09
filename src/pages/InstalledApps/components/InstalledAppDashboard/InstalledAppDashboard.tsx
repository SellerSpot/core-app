import { Loader } from 'components/Loader/Loader';
import { APP_DASHBOARD_NAMES } from 'config/dashboardNames';
import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { installedAppDashboardService } from 'services/services';
import { pushBreadCrumbs } from 'store/models/breadCrumb';
import { commonSelector, updateCommonState } from 'store/models/common';
import { IAppResponse } from 'typings/response.types';
import { ICONS } from 'utilities/icons';
import { getInstalledAppDashboardStyle } from './installedappdashboard.styles';
import { getTenantInstalledAppByIdOrSlug } from './installedappsdashboard.actions';
const styles = getInstalledAppDashboardStyle();

export const InstalledAppDashboard = (): ReactElement => {
    const history = useHistory();
    const params = useParams<{ slug: string }>();
    const dispatch = useDispatch();
    const [appDetails, setAppDetails] = useState({} as IAppResponse);
    const [isLoading, setIsLoading] = useState(true);
    const commonState = useSelector(commonSelector);

    const minmizeMainNav = (maximize = false) => {
        if (commonState.isLeftNavBarExpanded)
            dispatch(
                updateCommonState({
                    isLeftNavBarExpanded: maximize,
                }),
            );
    };

    useEffect(() => {
        try {
            minmizeMainNav();
            const appSlug = params.slug;
            if (!appSlug) throw 'Invalid Url';
            (async () => {
                try {
                    const app = await getTenantInstalledAppByIdOrSlug(appSlug);
                    if (!app) throw 'Invalid Request!';
                    dispatch(
                        pushBreadCrumbs([
                            {
                                icon: ICONS.APP,
                                route: ROUTES.INSTALLED_APPS_HOME,
                                title: 'Apps',
                            },
                            {
                                icon: ICONS[app.iconUrl as keyof typeof ICONS],
                                route: `${ROUTES.INSTALLED_APPS_APP}/${app.slug}`,
                                title: app.name,
                            },
                        ]),
                    );
                    setAppDetails(app);
                    setIsLoading(false);
                } catch (error) {
                    console.error(error);
                    history.push(ROUTES.APP_STORE);
                }
            }).call(null);
        } catch (error) {
            console.error(error);
            // show notificaiton
            history.push(ROUTES.APP_STORE);
        }
        return () => {
            minmizeMainNav(true);
        };
    }, []);
    const Dashboard = installedAppDashboardService.getAppDashobard(
        (appDetails.slug ??
            installedAppDashboardService.getDashboardNameFromAppName(
                appDetails.name,
            )) as keyof typeof APP_DASHBOARD_NAMES,
    );

    return isLoading ? (
        <Loader />
    ) : (
        <div className={styles.installedAppDashboardWrapper} onClick={() => minmizeMainNav()}>
            {Dashboard ? (
                <Dashboard appDetails={appDetails} />
            ) : (
                <Redirect to={ROUTES.INSTALLED_APPS} />
            )}
        </div>
    );
};
