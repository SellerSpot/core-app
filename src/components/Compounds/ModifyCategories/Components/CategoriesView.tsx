import { Button } from '@sellerspot/universal-components';
import React, { ReactElement, useState } from 'react';
import { TreeItem } from 'react-sortable-tree';
import { ICONS } from 'utilities/icons';
import styles from '../ModifyCategories.module.scss';
import { TSetSortableTreeDataState } from '../ModifyCategories.types';
import { SortableTreeComponent } from './SortableTreeComponent';

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
                size="small"
                theme="primary"
                startIcon={<ICONS.MdAdd />}
                variant="contained"
                onClick={onClickHandler}
            />
        </div>
    );
};

export const CategoriesView = (props: {
    sortableTreeData: TreeItem[];
    searchQuery: string;
}): ReactElement => {
    const { sortableTreeData, searchQuery } = props;
    const [sortableTreeDataState, setSortableTreeDataState] = useState(sortableTreeData);
    return (
        <div className={styles.categoriesViewWrapper}>
            <AddTopLevelCategory setSortableTreeDataState={setSortableTreeDataState} />
            <div className={styles.categoriesView}>
                <SortableTreeComponent
                    searchQuery={searchQuery}
                    setSortableTreeDataState={setSortableTreeDataState}
                    sortableTreeDataState={sortableTreeDataState}
                />
            </div>
        </div>
    );
};
