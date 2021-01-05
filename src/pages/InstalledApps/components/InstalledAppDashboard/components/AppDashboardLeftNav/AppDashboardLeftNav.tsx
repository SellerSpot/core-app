import { cx } from '@emotion/css';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons';
import { getAppDashboardLeftNavStyles } from './appdashboardleftnav.styles';

const styles = getAppDashboardLeftNavStyles();

export const AppDashboardLeftNav = (): ReactElement => {
    return (
        <div className={cx(styles.appDashboardLeftNavWrapper)}>
            <div className={cx(styles.logoHolder)}>
                <div className={cx(styles.appLogoContainer)}>
                    <div className={cx(styles.appLogo)}>
                        <ICONS.CASH_REGISTER />
                    </div>
                    <div className={cx(styles.appTitle)}>Point of Sale</div>
                </div>
            </div>
            <div className={cx(styles.menuHolder)}></div>
        </div>
    );
};
