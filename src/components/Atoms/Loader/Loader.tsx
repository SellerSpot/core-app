import React, { ReactElement } from 'react';
import { ILoaderProps } from './Loader.types';
import styles from './Loader.module.scss';

export const Loader = (props: ILoaderProps): ReactElement => {
    const { children, isLoading, skeleton } = props;
    return (
        <div>{isLoading ? skeleton : <div className={styles.childrenContent}>{children}</div>}</div>
    );
};
