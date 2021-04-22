import cn from 'classnames';
import React, { ReactElement } from 'react';

import styles from './dashboard.module.scss';

export const Dashboard = (): ReactElement => {
    return <div className={cn(styles.dashboardWrapper)}>Dashboard</div>;
};
