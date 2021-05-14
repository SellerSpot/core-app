import React, { ReactElement } from 'react';
import { AppPreloader, Skeleton } from '@sellerspot/universal-components';
import { ILoaderProps } from './Loader.types';
import styles from './Loader.module.scss';

export const Loader = (props: ILoaderProps): ReactElement => {
    // props
    const { children, isLoading, skeleton, loaderType } = props;

    // draw
    const shimmer = skeleton ?? (
        <Skeleton animation={'wave'} height={'100%'} width={'100%'} variant={'rect'} />
    );
    const loader = loaderType === 'spinner' ? <AppPreloader /> : shimmer;
    return <>{isLoading ? loader : <div className={styles.childrenContent}>{children}</div>}</>;
};
