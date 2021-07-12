import { AppPreloader, Skeleton } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { ILoaderProps } from './Loader.types';

export const Loader = (props: ILoaderProps): ReactElement => {
    // props
    const { children, isLoading, skeleton, loaderType = 'spinner', message } = props;

    // draw
    const shimmer = skeleton ?? (
        <Skeleton animation={'wave'} height={'100%'} width={'100%'} variant={'rect'} />
    );
    const loader = loaderType === 'spinner' ? <AppPreloader message={message} /> : shimmer;

    return <>{isLoading ? loader : children}</>; // need to replace with react-group-transition => remove div container, just wrap it with cssTransition
};
