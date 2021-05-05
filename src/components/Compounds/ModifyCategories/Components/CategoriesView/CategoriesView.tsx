import { Button, Skeleton } from '@sellerspot/universal-components';
import { Loader } from 'components/Atoms/Loader/Loader';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { insertNode } from 'react-sortable-tree';
import { ICONS } from 'utilities/icons';
import { useModifyCategoriesStore } from '../../ModifyCategories';
import styles from '../../ModifyCategories.module.scss';
import { EditCategorySlider } from './Components/EditCategorySlider.tsx/EditCategorySlider';
import { SortableTreeComponent } from './Components/SortableTreeComponent/SortableTreeComponent';

const getNodeKey = ({ treeIndex }: { treeIndex: number }) => treeIndex;

const AddTopLevelCategory = () => {
    // fetching values from store
    const setTreeData = useModifyCategoriesStore((state) => state.setTreeData);
    const treeData = useModifyCategoriesStore((state) => state.treeData);

    const onClickHandler = () => {
        const newTreeData = insertNode({
            depth: 0,
            newNode: {
                title: 'New Category',
                id: Math.random().toString(36).substr(2, 5),
                // setting created new flag
                createdNew: true,
            },
            treeData,
            getNodeKey,
            minimumTreeIndex: 0,
        }).treeData;
        setTreeData(newTreeData);
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
            <Loader isLoading={isLoading} skeleton={<LoadingSkeleton />}>
                <div className={styles.categoriesView} style={categoriesViewStyle}>
                    <SortableTreeComponent />
                </div>
            </Loader>
            <EditCategorySlider />
        </div>
    );
};
