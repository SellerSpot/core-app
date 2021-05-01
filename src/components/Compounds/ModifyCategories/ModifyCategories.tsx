import { InputField } from '@sellerspot/universal-components';
import React, { ReactElement, useState } from 'react';
import SortableTree, { TreeItem } from 'react-sortable-tree';
import { ICONS } from 'utilities/icons';
import styles from './ModifyCategories.module.scss';
import { ModifyCategoriesService } from './ModifyCategories.service';
import { IModifyCategoriesProps } from './ModifyCategories.types';
export { IModifyCategoriesProps } from './ModifyCategories.types';

const SearchField = () => {
    return (
        <div className={styles.searchField}>
            <InputField
                fullWidth
                theme="primary"
                autoFocus
                placeHolder={'Search for category'}
                disableHelperTextPlaceholderPadding
                prefix={<ICONS.MdSearch />}
            />
        </div>
    );
};

const CategoriesView = (props: { sortableTreeData: TreeItem[] }) => {
    const { sortableTreeData } = props;
    const [sortableTreeDataState, setsortableTreeDataState] = useState(sortableTreeData);
    return (
        <div className={styles.categoriesView}>
            <SortableTree
                rowHeight={80}
                treeData={sortableTreeDataState}
                onChange={setsortableTreeDataState}
            />
        </div>
    );
};

export const ModifyCategories = (props: IModifyCategoriesProps): ReactElement => {
    const { categoriesData } = props;
    const sortableTreeData = ModifyCategoriesService.convertToTreeData(categoriesData);

    return (
        <div className={styles.modifyCategories}>
            <SearchField />
            <CategoriesView sortableTreeData={sortableTreeData} />
        </div>
    );
};
