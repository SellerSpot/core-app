import { ROUTES } from 'config/routes';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { commonSelector, updateCommonState } from 'store/models/common';
import { ICONS } from 'utilities/icons';
import { LogoHolder } from './components/LogoHolder/LogoHolder';
import { IMenuItemProps, MenuHolder } from './components/MenuHolder/MenuHolder';
import { ProfileHolder } from './components/ProfileHolder/ProfileHolder';
import { getLeftNavBarStyles } from './leftnavbar.styles';

export const LeftNavbar = (): ReactElement => {
    const styles = getLeftNavBarStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const commonState = useSelector(commonSelector);
    const menuItems: IMenuItemProps[] = [
        {
            Icon: ICONS.HOME,
            title: 'Home',
            routes: [ROUTES.HOME],
            onClick: () => {
                history.push(ROUTES.HOME);
            },
        },
        {
            Icon: ICONS.INSTALLED_APPS,
            title: 'Installed Apps',
            routes: [
                ROUTES.INSTALLED_APPS,
                ROUTES.INSTALLED_APPS_HOME,
                ROUTES.INSTALLED_APPS_APPS,
                ROUTES.INSTALLED_APPS_APP,
                ROUTES.INSTALLED_APP_POINT_OF_SALE,
                ROUTES.INSTALLED_APP_POINT_OF_SALE_HOME,
                ROUTES.INSTALLED_APP_POINT_OF_SALE_SETTINGS,
            ],
            onClick: () => {
                history.push(ROUTES.INSTALLED_APPS);
            },
        },
        {
            Icon: ICONS.APP_STORE,
            title: 'App Store',
            routes: [
                ROUTES.APP_STORE,
                ROUTES.APP_STORE_HOME,
                ROUTES.APP_STORE_APPS,
                ROUTES.APP_STORE_PLUGINS,
                ROUTES.APP_STORE_APP,
                ROUTES.APP_STORE_PLUGIN,
            ],
            onClick: () => {
                history.push(ROUTES.APP_STORE);
            },
        },
        {
            Icon: ICONS.BILLING,
            title: 'Billing',
            routes: [ROUTES.BILLING],
            onClick: () => {
                history.push(ROUTES.BILLING);
            },
        },
        {
            Icon: ICONS.GLOBE,
            title: 'Domain Settings',
            routes: [ROUTES.SUB_DOMAIN_SETUP],
            onClick: () => {
                history.push(ROUTES.SUB_DOMAIN_SETUP);
            },
        },
    ];
    const expandNavBarHandler = () => {
        if (!commonState.isLeftNavBarExpanded)
            dispatch(
                updateCommonState({
                    isLeftNavBarExpanded: true,
                }),
            );
    };

    return (
        <div className={styles.leftnavWrapper} onClick={expandNavBarHandler}>
            <div className={styles.leftNavContainer}>
                <div className={styles.logoHolder}>
                    <LogoHolder />
                </div>
                <div className={styles.menuHolder}>
                    <MenuHolder menuItems={menuItems} />
                </div>
                <div className={styles.profileHolder}>
                    <ProfileHolder />
                </div>
            </div>
        </div>
    );
};
