import React, { ReactElement } from 'react';
import { getMenuHolderStyles } from './menuholder.styles';
import { useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { IconType } from 'react-icons/lib';
import { cx } from '@emotion/css';
import { ICONS } from 'utilities/icons';

const styles = getMenuHolderStyles();

export interface IMenuItemProps {
    Icon: IconType;
    title: string;
    onClick: React.DOMAttributes<HTMLDivElement>['onClick'];
    routes?: string[];
    active?: boolean;
    customClassNames?: {
        menuItem?: string;
    };
}

export const MenuItem = (props: IMenuItemProps): ReactElement => {
    const { Icon, onClick, title, customClassNames, active } = props;
    return (
        <div
            className={cx(styles.menuItem, customClassNames?.menuItem, {
                [styles.menuItemActive]: active,
            })}
            onClick={onClick}
        >
            <div className={styles.menuItemIcon}>
                <Icon />
            </div>
            <div className={styles.menuItemTitle}>{title}</div>
        </div>
    );
};

export const MenuHolder = (): ReactElement => {
    const history = useHistory();
    const location = useLocation();

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
            routes: [ROUTES.INSTALLED_APPS],
            onClick: () => {
                history.push(ROUTES.INSTALLED_APPS);
            },
        },
        {
            Icon: ICONS.APP_STORE,
            title: 'App Store',
            routes: [ROUTES.APP_STORE],
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
    ];
    return (
        <div className={styles.menuHolderWrapper}>
            <div className={styles.menuContainer}>
                {menuItems.map((menuItem, key) => (
                    <MenuItem
                        key={key}
                        {...menuItem}
                        active={menuItem.routes.includes(location.pathname)}
                    />
                ))}
            </div>
        </div>
    );
};
