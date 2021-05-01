import { InputField } from '@sellerspot/universal-components';
import React, { ReactElement, useState } from 'react';
import { TreeItem } from 'react-sortable-tree';
import { ICONS } from 'utilities/icons';
import { CategoriesView } from './Components/CategoriesView';
import styles from './ChooseCategory.module.scss';
import { IChooseCategoryProps } from './ChooseCategory.types';

export { IChooseCategoryProps } from './ChooseCategory.types';

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

export const ChooseCategory = (props: IChooseCategoryProps): ReactElement => {
    const { categoriesData } = props;
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <div className={styles.chooseCategory}>
            <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <CategoriesView
                sortableTreeData={categoriesData as TreeItem[]}
                searchQuery={searchQuery}
            />
        </div>
    );
};
