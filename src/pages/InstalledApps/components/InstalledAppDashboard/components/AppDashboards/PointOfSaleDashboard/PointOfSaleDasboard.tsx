import { ROUTES } from 'config/routes';
import { LeftNavbar } from 'pages/LeftNavbar/LeftNavbar';
import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { IAppResponse } from 'typings/response.types';
import { AppDashboardLeftNav } from '../../AppDashboardLeftNav/AppDashboardLeftNav';
import { IInstalledAppDashboardProps } from '../installedappdashboard.types';
import { getPointOfSaleDashboardStyles } from './pointofsaledashboard.styles';
const styles = getPointOfSaleDashboardStyles();

export const PointOfSaleDasboard = (props: IInstalledAppDashboardProps): ReactElement => {
    return (
        <div className={styles.pointOfSaleDashboardWrappper}>
            {/* Point of sale dashboard <pre>{JSON.stringify(props.data, null, 4)}</pre> */}
            <div className={styles.leftNavWrapper}>
                <AppDashboardLeftNav />
            </div>
            <div className={styles.mainBodyWrapper}>
                <Switch>
                    {/* slash routes needs to place at bottom */}
                    <Route path={[ROUTES.INSTALLED_APP_POINT_OF_SALE, ROUTES.INSTALLED_APPS_HOME]}>
                        Home
                    </Route>
                </Switch>
            </div>
        </div>
    );
};
