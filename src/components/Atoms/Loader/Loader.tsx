import React, { ReactElement } from 'react';
import styles from './Loader.module.scss';
import { ILoaderProps } from './Loader.types';

export const Loader = (props: ILoaderProps): ReactElement => {
    const { children, isLoading, skeleton } = props;
    return (
        <div>{isLoading ? skeleton : <div className={styles.childrenContent}>{children}</div>}</div>
    );
};
