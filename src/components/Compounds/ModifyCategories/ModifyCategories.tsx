import { InputField } from '@sellerspot/universal-components';
import React, { ReactElement, useState } from 'react';
import { TreeItem } from 'react-sortable-tree';
import { ICONS } from 'utilities/icons';
import { CategoriesView } from './Components/CategoriesView';
import styles from './ModifyCategories.module.scss';
import { IModifyCategoriesProps } from './ModifyCategories.types';
import { debounce } from 'lodash';

export { IModifyCategoriesProps } from './ModifyCategories.types';

const SearchField = (props: { setSearchQuery: React.Dispatch<React.SetStateAction<string>> }) => {
    const { setSearchQuery } = props;
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
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <div className={styles.modifyCategories}>
            <SearchField setSearchQuery={setSearchQuery} />
            <CategoriesView
                sortableTreeData={categoriesData as TreeItem[]}
                searchQuery={searchQuery}
            />
        </div>
    );
};
