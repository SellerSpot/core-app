import { cx } from '@emotion/css';
import React, { ReactElement } from 'react';
import { animationStyles } from 'styles/animation.styles';
import { BreadCrumbs } from './components/BreadCrumbs/BreadCrumbs';
import { Notification } from './components/Notification/Notification';
import { getStyles } from './topnavbar.styles';

export const TopNavbar = (): ReactElement => {
    const styles = getStyles();
    return (
        <div
            className={cx(
                styles.topNavbarWrapper,
                animationStyles.compose.animate('fadeIn'),
                animationStyles.compose.duration(1),
            )}
        >
            <div className={styles.breadCrumbsHolder}>
                <BreadCrumbs />
            </div>
            <div className={styles.notificationHolder}>
                <Notification />
            </div>
        </div>
    );
};
