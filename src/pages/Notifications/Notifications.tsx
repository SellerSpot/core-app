import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearAndPushBreadCrumbs } from 'store/models/breadCrumb';
import { ICONS } from 'utilities/icons';
import { getNotificationsStyles } from './notifications.styles';
const styles = getNotificationsStyles();

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
    return <div className={styles.notificationsWrapper}>Notifications</div>;
};
