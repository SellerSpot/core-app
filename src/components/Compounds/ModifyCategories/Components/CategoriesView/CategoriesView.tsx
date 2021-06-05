import Icon from '@iconify/react';
import { Button, Skeleton } from '@sellerspot/universal-components';
import { Loader } from 'components/Atoms/Loader/Loader';
import React, { ReactElement, useEffect, useRef } from 'react';
import { State, useState } from '@hookstate/core';
import { ICONS } from 'utilities/utilities';
import styles from '../../ModifyCategories.module.scss';
import { SortableTreeComponent } from './Components/SortableTreeComponent/SortableTreeComponent';
import { IUseModifyCategoriesStore } from '../../ModifyCategories.types';

const AddTopLevelCategory = (props: { componentState: State<IUseModifyCategoriesStore> }) => {
    // props
    const { componentState } = props;

    // state
    const { toBeAddedNodeDetails } = useState(componentState);

    // handlers
    const onClickHandler = () => {
        toBeAddedNodeDetails.set({
            node: {
                title: 'New Category',
            },
            path: ['-1'],
        });
    };

    // draw
    return (
        <div className={styles.addTopLevelCategoryWrapper}>
            <Button
                label={'ADD CATEGORY'}
                theme="primary"
                startIcon={<Icon icon={ICONS.outlineAdd} />}
                variant="contained"
                onClick={onClickHandler}
            />
        </div>
    );
};

const LoadingSkeleton = () => {
    // draw
    return (
        <>
            {Array(4)
                .fill(0)
                .map((_, index) => {
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

export const CategoriesView = (props: {
    componentState: State<IUseModifyCategoriesStore>;
}): ReactElement => {
    // props
    const { componentState } = props;

    // state
    const state = componentState;
    const categoriesViewHeight = useState(null);
    const isLoading = useState(true);

    // hooks
    const categoriesViewWrapperRef = useRef<HTMLDivElement>(null);

    // compute
    // setting computed height for the tree component
    const categoriesViewStyle: React.CSSProperties = {
        height: `${categoriesViewHeight.get()}px`,
    };

    // effects
    useEffect(() => {
        categoriesViewHeight.set(categoriesViewWrapperRef.current?.clientHeight);
        isLoading.set(false);
    }, [categoriesViewWrapperRef]);

    // draw
    return (
        <div ref={categoriesViewWrapperRef} className={styles.categoriesViewWrapper}>
            <AddTopLevelCategory componentState={componentState} />
            <Loader
                isLoading={isLoading.get()}
                loaderType={'shimmer'}
                skeleton={<LoadingSkeleton />}
            >
                <div className={styles.categoriesView} style={categoriesViewStyle}>
                    <SortableTreeComponent componentState={state} />
                </div>
            </Loader>
        </div>
    );
};
