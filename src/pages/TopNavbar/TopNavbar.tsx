import React, { ReactElement } from 'react';
import { Notification } from './components/Notification/Notification';
import { getStyles } from './topnavbar.styles';

export const TopNavbar = (): ReactElement => {
    const styles = getStyles();
    return (
        <div className={styles.topNavbarWrapper}>
            <div className={styles.breadCrumbsHolder}>breadcrumbs</div>
            <div className={styles.notificationHolder}>
                <Notification />
            </div>
        </div>
    );
};
