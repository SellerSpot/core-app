import { cx } from '@emotion/css';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons';
import { getAppDashboardLeftNavStyles } from './appdashboardleftnav.styles';
import { StatusFlag } from '@sellerspot/universal-components';
import { IMenuItemProps, MenuHolder } from 'pages/LeftNavbar/components/MenuHolder/MenuHolder';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';

const styles = getAppDashboardLeftNavStyles();

export const AppDashboardLeftNav = (): ReactElement => {
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
    return (
        <div className={cx(styles.appDashboardLeftNavWrapper)}>
            <div className={cx(styles.logoHolder)}>
                <div className={cx(styles.appLogoContainer)}>
                    <div className={cx(styles.appLogo)}>
                        <ICONS.CASH_REGISTER />
                    </div>
                    <div className={cx(styles.appTitleHolder)}>
                        <div className={cx(styles.appTitle)}>Point of Sale</div>
                        <div className={cx(styles.appTitleStatusHolder)}>
                            <StatusFlag label={'Active'} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx(styles.menuHolder)}>
                <MenuHolder menuItems={menuItems} />
            </div>
        </div>
    );
};
