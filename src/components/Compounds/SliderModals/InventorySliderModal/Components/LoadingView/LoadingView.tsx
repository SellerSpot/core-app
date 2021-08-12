import React, { ReactElement } from 'react';
import styles from './LoadingView.module.scss';

export const LoadingView = (): ReactElement => {
    // draw
    return (
        <div className={styles.wrapper}>
            <h6>Loading Modal</h6>
        </div>
    );
};
