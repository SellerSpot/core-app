import React, { ReactElement } from 'react';
import { BreadCrumbs } from './components/BreadCrumbs/BreadCrumbs';
import { Notification } from './components/Notification/Notification';
import { getStyles } from './topnavbar.styles';

export const TopNavbar = (): ReactElement => {
    const styles = getStyles();
    return (
        <div className={styles.topNavbarWrapper}>
            <div className={styles.breadCrumbsHolder}>
                <BreadCrumbs />
            </div>
            <div className={styles.notificationHolder}>
                <Notification />
            </div>
        </div>
    );
};
