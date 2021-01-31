import { cx } from '@emotion/css';
import { UnderDevelopment } from 'components/UnderDevelopment/UnderDevelopment';
import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearAndPushBreadCrumbs } from 'store/models/breadCrumb';
import { animationStyles } from 'styles/animation.styles';
import { ICONS } from 'utilities/icons';
import styles from './notifications.module.scss';

export const Notifications = (): ReactElement => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            clearAndPushBreadCrumbs([
                {
                    icon: ICONS.NOTIFICATION,
                    route: ROUTES.NOTIFICATIONS,
                    title: 'Notifications',
                },
            ]),
        );
    }, []);
    return (
        <div
            className={cx(
                styles.notificationsWrapper,
                animationStyles.compose.animate('fadeIn'),
                animationStyles.compose.duration(1),
            )}
        >
            <UnderDevelopment />
        </div>
    );
};
