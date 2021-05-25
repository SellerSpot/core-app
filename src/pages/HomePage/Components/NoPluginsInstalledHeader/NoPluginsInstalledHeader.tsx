import { NoPluginsInstalledImage } from 'assets/svgs/NoPluginsInstalledImage/NoPluginsInstalledImage';
import React, { ReactElement } from 'react';
import styles from './NoPluginsInstalledHeader.module.scss';

export const NoPluginsInstalledHeader = (): ReactElement => {
    return (
        <div className={styles.wrapper}>
            <NoPluginsInstalledImage size={'220px'} />
            <div className={styles.messageWrapper}>
                <h2>
                    All you need now, are <span className={styles.specialText}>plugins!</span>
                </h2>
                <h4>Proceed to choose plugins based on your need below</h4>
            </div>
        </div>
    );
};
