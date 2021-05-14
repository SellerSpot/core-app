import { Button, Skeleton } from '@sellerspot/universal-components';
import { Loader } from 'components/Atoms/Loader/Loader';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { ICONS } from 'utilities/icons';
import { useModifyCategoriesStore } from '../../ModifyCategories';
import styles from '../../ModifyCategories.module.scss';
import { SortableTreeComponent } from './Components/SortableTreeComponent/SortableTreeComponent';

const AddTopLevelCategory = () => {
    // fetching values from store
    const setToBeAddedNodeDetails = useModifyCategoriesStore(
        (state) => state.setToBeAddedNodeDetails,
    );

    const onClickHandler = () => {
        setToBeAddedNodeDetails({
            node: {
                title: 'New Category',
            },
            path: ['-1'],
        });
    };

    return (
        <div className={styles.addTopLevelCategoryWrapper}>
            <Button
                label={'ADD CATEGORY'}
                theme="primary"
                startIcon={<ICONS.MdAdd />}
                variant="contained"
                onClick={onClickHandler}
            />
        </div>
    );
};

const LoadingSkeleton = () => {
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

export const CategoriesView = (): ReactElement => {
    const categoriesViewWrapperRef = useRef<HTMLDivElement>(null);
    const [categoriesViewHeight, setcategoriesViewHeight] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // setting computed height for the tree component
    const categoriesViewStyle: React.CSSProperties = {
        height: `${categoriesViewHeight}px`,
    };

    useEffect(() => {
        setcategoriesViewHeight(categoriesViewWrapperRef.current?.clientHeight);
        setIsLoading(false);
    }, [categoriesViewWrapperRef]);

    return (
        <div ref={categoriesViewWrapperRef} className={styles.categoriesViewWrapper}>
            <AddTopLevelCategory />
            <Loader isLoading={isLoading} loaderType={'shimmer'} skeleton={<LoadingSkeleton />}>
                <div className={styles.categoriesView} style={categoriesViewStyle}>
                    <SortableTreeComponent />
                </div>
            </Loader>
        </div>
    );
};
