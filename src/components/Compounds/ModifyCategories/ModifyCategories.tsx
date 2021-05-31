import Icon from '@iconify/react';
import { IconButton, IInputFieldProps, InputField } from '@sellerspot/universal-components';
import { debounce } from 'lodash';
import React, { ReactElement, useState } from 'react';
import { TreeItem } from 'react-sortable-tree';
import { ICONS } from 'utilities/utilities';
import create from 'zustand';
import { CategoriesView } from './Components/CategoriesView/CategoriesView';
import { EditCategorySlider } from './Components/CategoriesView/Components/EditCategorySlider.tsx/EditCategorySlider';
import styles from './ModifyCategories.module.scss';
import { IModifyCategoriesProps, TUseModifyCategoriesStore } from './ModifyCategories.types';

export { IModifyCategoriesProps } from './ModifyCategories.types';

export const useModifyCategoriesStore = create<TUseModifyCategoriesStore>((set) => ({
    treeData: [],
    searchQuery: null,
    editableNodeDetails: null,
    selectedNode: null,
    toBeDeletedNode: null,
    toBeAddedNodeDetails: null,
    setTreeData: (treeData) => {
        set({ treeData });
    },
    setSearchQuery: (searchQuery) => {
        set({ searchQuery });
    },
    setEditableNodeDetails: (editableNodeDetails) => {
        set({ editableNodeDetails });
    },
    setSelectedNode: (selectedNode) => {
        set({ selectedNode });
    },
    setToBeDeletedNode: (toBeDeletedNode) => {
        set({ toBeDeletedNode });
    },
    setToBeAddedNodeDetails: (toBeAddedNodeDetails) => {
        set({ toBeAddedNodeDetails });
    },
}));

const SearchField = () => {
    const setSearchQuery = useModifyCategoriesStore((state) => state.setSearchQuery);
    const [localFieldValue, setLocalFieldValue] = useState('');
    const pushSearchToTree = debounce((value: string) => {
        setSearchQuery(value);
    }, 700);
    const handleOnChange: IInputFieldProps['onChange'] = (event) => {
        const value = event.target.value;
        setLocalFieldValue(value);
        pushSearchToTree(value);
    };
    const clearSearchField = () => {
        setLocalFieldValue('');
        pushSearchToTree('');
    };
    const suffixComponent =
        localFieldValue?.length > 0 ? (
            <IconButton
                icon={<Icon icon={ICONS.outlineClear} />}
                theme="danger"
                size="small"
                onClick={clearSearchField}
            />
        ) : null;
    return (
        <div className={styles.searchField}>
            <InputField
                fullWidth
                theme="primary"
                autoFocus
                value={localFieldValue}
                placeHolder={'Search for category'}
                disableHelperTextPlaceholderPadding
                prefix={<Icon icon={ICONS.outlineSearch} />}
                suffix={suffixComponent}
                onChange={handleOnChange}
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
            <EditCategorySlider />
        </div>
    );
};
