import { ROUTES } from 'config/routes';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { ICONS } from 'utilities/icons';
import { getNotificationStyles } from './notification.styles';

const styles = getNotificationStyles();

export const Notification = (): ReactElement => {
    const history = useHistory();

    return (
        <div className={styles.notificationWrapper}>
            <div
                className={styles.notificationContainer}
                onClick={() => history.push(ROUTES.NOTIFICATIONS)}
            >
                <ICONS.NOTIFICATION />
                <div className={styles.notificationCounter}>2</div>
            </div>
        </div>
    );
};
