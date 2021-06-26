import React, { ReactElement } from 'react';
import cn from 'classnames';
import { AppPreloader, Skeleton } from '@sellerspot/universal-components';
import styles from './Loader.module.scss';
import { ILoaderProps } from './Loader.types';

export const Loader = (props: ILoaderProps): ReactElement => {
    // props
    const {
        children,
        isLoading,
        skeleton,
        loaderType = 'spinner',
        message,
        wrapperDivClassName,
    } = props;

    // draw
    const shimmer = skeleton ?? (
        <Skeleton animation={'wave'} height={'100%'} width={'100%'} variant={'rect'} />
    );
    const loader = loaderType === 'spinner' ? <AppPreloader message={message} /> : shimmer;

    return (
        <>
            {isLoading ? (
                <div
                    className={cn(styles.childrenContent, wrapperDivClassName, {
                        [styles.frameDimension]: !wrapperDivClassName,
                    })}
                >
                    {loader}
                </div>
            ) : (
                <span className={cn(styles.childrenContent, wrapperDivClassName)}>{children}</span>
            )}
        </>
    ); // need to replace with react-group-transition => remove div container, just wrap it with cssTransition
};
