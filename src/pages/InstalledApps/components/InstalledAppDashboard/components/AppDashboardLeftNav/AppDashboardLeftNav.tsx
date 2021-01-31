import { cx } from '@emotion/css';
import React, { ReactElement } from 'react';
import styles from './appdashboardleftnav.module.scss';
import { IStatusFlagProps, StatusFlag } from '@sellerspot/universal-components';
import { IMenuItemProps, MenuHolder } from 'pages/LeftNavbar/components/MenuHolder/MenuHolder';
import { IconType } from 'react-icons';

export interface IAppDashboardLeftNavProps {
    header: {
        Icon: IconType;
        appName: string;
        status: IStatusFlagProps;
    };
    menuItems: IMenuItemProps[];
}

export const AppDashboardLeftNav = (props: IAppDashboardLeftNavProps): ReactElement => {
    return (
        <div className={cx(styles.appDashboardLeftNavWrapper)}>
            <div className={cx(styles.logoHolder)}>
                <div className={cx(styles.appLogoContainer)}>
                    <div className={cx(styles.appLogo)}>
                        <props.header.Icon />
                    </div>
                    <div className={cx(styles.appTitleHolder)}>
                        <div className={cx(styles.appTitle)}>{props.header.appName}</div>
                        <div className={cx(styles.appTitleStatusHolder)}>
                            <StatusFlag {...(props.header.status ?? {})} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx(styles.menuHolder)}>
                <MenuHolder menuItems={props.menuItems ?? []} />
            </div>
        </div>
    );
};
