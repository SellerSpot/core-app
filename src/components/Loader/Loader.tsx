import React, { ReactElement } from 'react';
import styles from './loader.module.scss';

export const Loader = (): ReactElement => {
    return <div className={styles.loaderWrapper}>Please wait, loading..</div>;
};
