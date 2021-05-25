import React, { ReactElement } from 'react';
import { NoPluginsInstalledHeader } from './Components/NoPluginsInstalledHeader/NoPluginsInstalledHeader';
import styles from './HomePage.module.scss';

export const HomePage = (): ReactElement => {
    return (
        <div className={styles.wrapper}>
            <NoPluginsInstalledHeader />
        </div>
    );
};
