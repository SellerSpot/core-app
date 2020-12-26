import { Button } from 'components/Button/Button';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unAuthenticate } from 'store/models/auth';
import { heartBeatSelector } from 'store/models/heartBeat';
import styles from './dashboard.module.css';

export const Dashboard = (): ReactElement => {
    const dispatch = useDispatch();
    const hearBeatState = useSelector(heartBeatSelector);
    const logoutHandler = () => {
        dispatch(unAuthenticate());
    };
    return (
        <div className={styles.dashboardWrapper}>
            <div>Dashboard</div>
            <div> Health - {hearBeatState.onlineServerStatus ? 'Online' : 'Offline'}</div>
            <Button
                label="Logout"
                onClick={logoutHandler}
                type={'button'}
                style={{
                    width: 60,
                    fontSize: 12,
                    height: 30,
                    backgroundColor: '#FF9800',
                    color: 'white',
                }}
            />
        </div>
    );
};
