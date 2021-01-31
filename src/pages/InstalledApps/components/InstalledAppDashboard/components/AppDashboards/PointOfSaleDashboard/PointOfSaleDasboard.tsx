import { cx } from '@emotion/css';
import { ROUTES } from 'config/routes';
import { IMenuItemProps } from 'pages/LeftNavbar/components/MenuHolder/MenuHolder';
import React, { ReactElement } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { animationStyles } from 'styles/animation.styles';
import { ICONS } from 'utilities/icons';
import {
    AppDashboardLeftNav,
    IAppDashboardLeftNavProps,
} from '../../AppDashboardLeftNav/AppDashboardLeftNav';
import { IInstalledAppDashboardProps } from '../../../installedappdashboard.types';
import { PosDashboardHome } from './components/PosDashboardHome/PosDashboardHome';
import { PosDashboardSettings } from './components/PosDashboardSettings/PosDashboardSettings';
import styles from './pointofsaledashboard.module.scss';

export const PointOfSaleDasboard = (props: IInstalledAppDashboardProps): ReactElement => {
    const history = useHistory();
    const menuItems: IMenuItemProps[] = [
        {
            Icon: ICONS.HOME,
            title: 'Home',
            routes: [ROUTES.INSTALLED_APP_POINT_OF_SALE, ROUTES.INSTALLED_APP_POINT_OF_SALE_HOME],
            onClick: () => {
                history.push(ROUTES.INSTALLED_APP_POINT_OF_SALE_HOME);
            },
        },
        {
            Icon: ICONS.SETTINGS,
            title: 'Settings',
            routes: [ROUTES.INSTALLED_APP_POINT_OF_SALE_SETTINGS],
            onClick: () => {
                history.push(ROUTES.INSTALLED_APP_POINT_OF_SALE_SETTINGS);
            },
        },
    ];
    const navHeader: IAppDashboardLeftNavProps['header'] = {
        Icon: ICONS[props.appDetails.iconUrl as keyof typeof ICONS],
        appName: props.appDetails.name,
        status: {
            label: 'Active',
        },
    };
    return (
        <div
            className={cx(
                styles.pointOfSaleDashboardWrappper,
                animationStyles.compose.animate('fadeIn'),
                animationStyles.compose.duration(1),
            )}
        >
            {/* Point of sale dashboard <pre>{JSON.stringify(props.appDetails, null, 4)}</pre> */}
            <div className={styles.leftNavWrapper}>
                <AppDashboardLeftNav menuItems={menuItems} header={navHeader} />
            </div>
            <div className={styles.mainBodyWrapper}>
                <Switch>
                    <Route path={ROUTES.INSTALLED_APP_POINT_OF_SALE_SETTINGS}>
                        <PosDashboardSettings {...props} />
                    </Route>
                    {/* slash routes needs to place at bottom */}
                    <Route path={[ROUTES.INSTALLED_APP_POINT_OF_SALE, ROUTES.INSTALLED_APPS_HOME]}>
                        <PosDashboardHome {...props} />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};
