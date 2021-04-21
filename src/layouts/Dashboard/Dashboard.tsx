import React, { ReactElement } from 'react';
import styles from './dashboard.module.scss';
import cn from 'classnames';

export const Dashboard = (): ReactElement => {
    return <div className={cn(styles.dashboardWrapper)}>Dashboard</div>;
};
