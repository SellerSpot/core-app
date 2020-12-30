import React, { ReactElement } from 'react';
import { getMenuHolderStyles } from './menuholder.styles';
import { IconType } from 'react-icons/lib';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { IoMdAppstore } from 'react-icons/io';
import { IoAppsSharp, IoHome } from 'react-icons/io5';
import { RiBillFill } from 'react-icons/ri';

const styles = getMenuHolderStyles();

interface IMenuItemProps {
    Icon: IconType;
    title: string;
    onClick: React.DOMAttributes<HTMLDivElement>['onClick'];
}

const MenuItem = (props: IMenuItemProps): ReactElement => {
    const { Icon, onClick, title } = props;
    return (
        <div className={styles.menuItem} onClick={onClick}>
            <div className={styles.menuItemIcon}>
                <Icon />
            </div>
            <div className={styles.menuItemTitle}>{title}</div>
        </div>
    );
};

export const MenuHolder = (): ReactElement => {
    const history = useHistory();
    const menuItems: IMenuItemProps[] = [
        {
            Icon: IoHome,
            title: 'Home',
            onClick: () => {
                history.push(ROUTES.HOME);
            },
        },
        {
            Icon: IoAppsSharp,
            title: 'Installed Apps',
            onClick: () => {
                history.push(ROUTES.INSTALLED_APPS);
            },
        },
        {
            Icon: IoMdAppstore,
            title: 'App Store',
            onClick: () => {
                history.push(ROUTES.APP_STORE);
            },
        },
        {
            Icon: RiBillFill,
            title: 'Billing',
            onClick: () => {
                history.push(ROUTES.BILLING);
            },
        },
    ];
    return (
        <div className={styles.menuHolderWrapper}>
            <div className={styles.menuContainer}>
                {menuItems.map((menuItem, key) => (
                    <MenuItem key={key} {...menuItem} />
                ))}
            </div>
        </div>
    );
};
