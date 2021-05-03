import { InputField } from '@sellerspot/universal-components';
import { debounce } from 'lodash';
import React, { ReactElement } from 'react';
import { TreeItem } from 'react-sortable-tree';
import { ICONS } from 'utilities/icons';
import create from 'zustand';
import { CategoriesView } from './Components/CategoriesView/CategoriesView';
import styles from './ModifyCategories.module.scss';
import { IModifyCategoriesProps, TUseModifyCategoriesStore } from './ModifyCategories.types';

export { IModifyCategoriesProps } from './ModifyCategories.types';

export const useModifyCategoriesStore = create<TUseModifyCategoriesStore>((set) => ({
    treeData: [],
    searchQuery: null,
    editableNodeId: null,
    selectedNode: null,
    toBeDeletedNode: null,
    setTreeData: (treeData) => {
        set({ treeData });
    },
    setSearchQuery: (searchQuery) => {
        set({ searchQuery });
    },
    setEditableNodeId: (editableNodeId) => {
        set({ editableNodeId });
    },
    setSelectedNode: (selectedNode) => {
        set({ selectedNode });
    },
    setToBeDeletedNode: (toBeDeletedNode) => {
        set({ toBeDeletedNode });
    },
}));

const SearchField = () => {
    const setSearchQuery = useModifyCategoriesStore((state) => state.setSearchQuery);
    return (
        <div className={styles.searchField}>
            <InputField
                fullWidth
                theme="primary"
                autoFocus
                placeHolder={'Search for category'}
                disableHelperTextPlaceholderPadding
                prefix={<ICONS.MdSearch />}
                onChange={debounce((event) => {
                    setSearchQuery(event.target.value);
                }, 300)}
            />
        </div>
    );
};

export const ModifyCategories = (props: IModifyCategoriesProps): ReactElement => {
    const { categoriesData } = props;
    const setTreeData = useModifyCategoriesStore((state) => state.setTreeData);
    // setting tree data
    setTreeData(categoriesData as TreeItem[]);

    return (
        <div className={styles.modifyCategories}>
            <SearchField />
            <CategoriesView />
        </div>
    );
};
