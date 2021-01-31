import { cx } from '@emotion/css';
import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ICONS } from 'utilities/icons';
import styles from './notification.module.scss';

export const Notification = (): ReactElement => {
    const history = useHistory();
    const location = useLocation();
    const notificaitonRoutesToListen = [ROUTES.NOTIFICATIONS];
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (notificaitonRoutesToListen.includes(location.pathname)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [location]);

    return (
        <div className={cx(styles.notificationWrapper, { [styles.notificationActive]: isActive })}>
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
