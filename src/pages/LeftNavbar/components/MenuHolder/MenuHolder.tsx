import React, { ReactElement } from 'react';
import styles from './menuholder.module.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { IconType } from 'react-icons/lib';
import { cx } from '@emotion/css';

export interface IMenuHolderProps {
    menuItems: IMenuItemProps[];
}

export interface IMenuItemProps {
    Icon: IconType;
    title: string;
    onClick: React.DOMAttributes<HTMLDivElement>['onClick'];
    /* it helps to highlight navbar on particular routes */
    routes?: string[];
    active?: boolean;
    customClassNames?: {
        menuItem?: string;
    };
}

export const MenuItem = (props: IMenuItemProps): ReactElement => {
    const defaultProps: IMenuItemProps = {
        Icon: ((<i></i>) as unknown) as IconType,
        onClick: () => void 0,
        routes: [],
        title: '',
        active: false,
    };
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

export const MenuHolder = (props: IMenuHolderProps): ReactElement => {
    const history = useHistory();
    const location = useLocation();
    const menuItems: IMenuItemProps[] = props.menuItems;
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
