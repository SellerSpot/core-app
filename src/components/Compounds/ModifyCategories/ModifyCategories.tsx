import { Button, InputField } from '@sellerspot/universal-components';
import React, { ReactElement, useState } from 'react';
import SortableTree, { changeNodeAtPath, TreeItem } from 'react-sortable-tree';
import { ICONS } from 'utilities/icons';
import styles from './ModifyCategories.module.scss';
import { ModifyCategoriesService } from './ModifyCategories.service';
import { IModifyCategoriesProps } from './ModifyCategories.types';

export { IModifyCategoriesProps } from './ModifyCategories.types';

const SearchField = (props: {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const { searchQuery, setSearchQuery } = props;
    return (
        <div className={styles.searchField}>
            <InputField
                fullWidth
                theme="primary"
                autoFocus
                value={searchQuery}
                placeHolder={'Search for category'}
                disableHelperTextPlaceholderPadding
                prefix={<ICONS.MdSearch />}
                onChange={(event) => {
                    setSearchQuery(event.target.value);
                }}
            />
        </div>
    );
};

const CategoriesView = (props: { sortableTreeData: TreeItem[]; searchQuery: string }) => {
    const { sortableTreeData, searchQuery } = props;
    const [sortableTreeDataState, setSortableTreeDataState] = useState(sortableTreeData);
    const getNodeKey = ({ treeIndex }: { treeIndex: number }) => treeIndex;

    const AddTopLevelCategory = () => {
        return (
            <div className={styles.addTopLevelCategoryWrapper}>
                <Button
                    label={'Add Top-Level Category'}
                    size="small"
                    theme="primary"
                    startIcon={<ICONS.MdAdd />}
                    variant="contained"
                    onClick={() => {
                        setSortableTreeDataState((state) =>
                            state.concat({
                                title: 'New Category',
                            }),
                        );
                    }}
                />
            </div>
        );
    };

    return (
        <div className={styles.categoriesViewWrapper}>
            <AddTopLevelCategory />
            <div className={styles.categoriesView}>
                {/* <AddTopLevelCategory /> */}
                <SortableTree
                    rowHeight={70}
                    treeData={sortableTreeDataState}
                    searchQuery={searchQuery}
                    onChange={setSortableTreeDataState}
                    generateNodeProps={(data) => {
                        const { node, path } = data;
                        const nodeTitle = node.title + '';
                        return {
                            title: (
                                <div className={styles.categoryNameField}>
                                    <InputField
                                        size="small"
                                        disableHelperTextPlaceholderPadding
                                        theme="primary"
                                        value={nodeTitle}
                                        onChange={(event) => {
                                            const title = event.target.value;
                                            const newTreeData = changeNodeAtPath({
                                                treeData: sortableTreeDataState,
                                                getNodeKey,
                                                path,
                                                newNode: { ...node, title },
                                            });
                                            setSortableTreeDataState(newTreeData);
                                        }}
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
            </div>
        </div>
    );
};

export const ModifyCategories = (props: IModifyCategoriesProps): ReactElement => {
    const { categoriesData } = props;
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <div className={styles.modifyCategories}>
            <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <CategoriesView
                sortableTreeData={categoriesData as TreeItem[]}
                searchQuery={searchQuery}
            />
        </div>
    );
};
