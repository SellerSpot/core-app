import { Button, InputField } from '@sellerspot/universal-components';
import styles from '../ModifyCategories.module.scss';
import React, { ReactElement, useState } from 'react';
import SortableTree, { changeNodeAtPath, TreeItem } from 'react-sortable-tree';
import { ICONS } from 'utilities/icons';
import { ModifyCategoriesService } from '../ModifyCategories.service';

type TSetSortableTreeDataState = React.Dispatch<React.SetStateAction<TreeItem[]>>;
type TTitleInputFieldEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const AddTopLevelCategory = (props: { setSortableTreeDataState: TSetSortableTreeDataState }) => {
    const { setSortableTreeDataState } = props;

    const onClickHandler = () => {
        setSortableTreeDataState((state) =>
            state.concat({
                title: 'New Category',
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

const SortableTreeComponent = (props: {
    sortableTreeDataState: TreeItem[];
    searchQuery: string;
    setSortableTreeDataState: TSetSortableTreeDataState;
}) => {
    const { sortableTreeDataState, searchQuery, setSortableTreeDataState } = props;
    const getNodeKey = ({ treeIndex }: { treeIndex: number }) => treeIndex;

    return (
        <SortableTree
            rowHeight={70}
            treeData={sortableTreeDataState}
            searchQuery={searchQuery}
            onChange={setSortableTreeDataState}
            generateNodeProps={(data) => {
                const { node, path } = data;
                const nodeTitle = node.title + '';

                const titleOnChangeHandler = (event: TTitleInputFieldEvent) => {
                    const title = event.target.value;
                    const newTreeData = changeNodeAtPath({
                        treeData: sortableTreeDataState,
                        getNodeKey,
                        path,
                        newNode: { ...node, title },
                    });
                    setSortableTreeDataState(newTreeData);
                };

                return {
                    title: (
                        <div className={styles.categoryNameField}>
                            <InputField
                                size="small"
                                disableHelperTextPlaceholderPadding
                                theme="primary"
                                value={nodeTitle}
                                onChange={titleOnChangeHandler}
                            />
                        </div>
                    ),
                    buttons: ModifyCategoriesService.getSortableTreeButtons({
                        getNodeKey,
                        path: path as number[],
                        treeData: sortableTreeDataState,
                        setSortableTreeDataState,
                    }),
                };
            }}
        />
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
