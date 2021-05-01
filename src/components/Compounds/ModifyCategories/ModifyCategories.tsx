import { InputField } from '@sellerspot/universal-components';
import React, { ReactElement, useState } from 'react';
import { TreeItem } from 'react-sortable-tree';
import { ICONS } from 'utilities/icons';
import { CategoriesView } from './Components/CategoriesView';
import styles from './ModifyCategories.module.scss';
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
