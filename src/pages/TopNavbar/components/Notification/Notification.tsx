import React, { ReactElement } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import { getNotificationStyles } from './notification.styles';

const styles = getNotificationStyles();

export const Notification = (): ReactElement => {
    return (
        <div className={styles.notificationWrapper}>
            <div className={styles.notificationContainer}>
                <IoMdNotifications />
                <div className={styles.notificationCounter}>2</div>
            </div>
        </div>
    );
};
