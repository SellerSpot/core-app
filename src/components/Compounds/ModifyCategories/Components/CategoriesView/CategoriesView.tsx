import { Button, Skeleton } from '@sellerspot/universal-components';
import { Loader } from 'components/Atoms/Loader/Loader';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { TreeItem } from 'react-sortable-tree';
import { ICONS } from 'utilities/icons';
import styles from '../ModifyCategories.module.scss';
import { TSetSortableTreeDataState } from '../../ModifyCategories.types';
import { SortableTreeComponent } from './Components/SortableTreeComponent/SortableTreeComponent';

const AddTopLevelCategory = (props: { setSortableTreeDataState: TSetSortableTreeDataState }) => {
    const { setSortableTreeDataState } = props;

    const onClickHandler = () => {
        setSortableTreeDataState((state) =>
            state.concat({
                title: 'New Category',
                id: Math.random().toString(36).substr(2, 5),
                // setting created new flag
                createdNew: true,
            }),
        );
    };

    return (
        <div className={styles.addTopLevelCategoryWrapper}>
            <Button
                label={'Add Top-Level Category'}
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

export const CategoriesView = (props: {
    sortableTreeData: TreeItem[];
    searchQuery: string;
}): ReactElement => {
    const { sortableTreeData, searchQuery } = props;

    const categoriesViewWrapperRef = useRef<HTMLDivElement>(null);
    const [sortableTreeDataState, setSortableTreeDataState] = useState(sortableTreeData);
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
            <AddTopLevelCategory setSortableTreeDataState={setSortableTreeDataState} />
            <Loader isLoading={isLoading} skeleton={<LoadingSkeleton />}>
                <div className={styles.categoriesView} style={categoriesViewStyle}>
                    <SortableTreeComponent
                        searchQuery={searchQuery}
                        setSortableTreeDataState={setSortableTreeDataState}
                        sortableTreeDataState={sortableTreeDataState}
                    />
                </div>
            </Loader>
        </div>
    );
};
