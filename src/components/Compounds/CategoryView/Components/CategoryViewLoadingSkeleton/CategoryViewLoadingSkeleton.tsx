import React, { ReactElement } from 'react';
import { Skeleton } from '@sellerspot/universal-components';
import styles from './CategoryViewLoadingSkeleton.module.scss';
import { times } from 'lodash';

export const CategoryViewLoadingSkeleton = (): ReactElement => {
    // draw
    return (
        <>
            {times(4).map((index) => {
                return (
                    <div className={styles.loaderSkeleton} key={index}>
                        <Skeleton variant="circle" height={16} width={16} />
                        <div className={styles.skeletonNode}>
                            <Skeleton variant="rect" height={56} width={44} />
                            <Skeleton variant="rect" height={56} width={230} />
                        </div>
                    </div>
                );
            })}
        </>
    );
};
