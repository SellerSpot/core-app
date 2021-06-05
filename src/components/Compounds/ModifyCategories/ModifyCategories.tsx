import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { IconButton, IInputFieldProps, InputField } from '@sellerspot/universal-components';
import { debounce } from 'lodash';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import { CategoriesView } from './Components/CategoriesView/CategoriesView';
import { EditCategorySlider } from './Components/CategoriesView/Components/EditCategorySlider.tsx/EditCategorySlider';
import styles from './ModifyCategories.module.scss';
import { IModifyCategoriesProps, IUseModifyCategoriesStore } from './ModifyCategories.types';

export { IModifyCategoriesProps } from './ModifyCategories.types';

const SearchField = (props: { componentState: State<IUseModifyCategoriesStore> }) => {
    // props
    const { componentState } = props;

    // state
    const { searchQuery } = useState(componentState);
    const localFieldValue = useState('');

    // handlers
    const pushSearchToTree = debounce((value: string) => {
        searchQuery.set(value);
    }, 700);
    const handleOnChange: IInputFieldProps['onChange'] = (event) => {
        const value = event.target.value;
        localFieldValue.set(value);
        pushSearchToTree(value);
    };
    const clearSearchField = () => {
        localFieldValue.set('');
        pushSearchToTree('');
    };

    // components
    const suffixComponent =
        localFieldValue.get()?.length > 0 ? (
            <IconButton
                icon={<Icon icon={ICONS.outlineClear} />}
                theme="danger"
                size="small"
                onClick={clearSearchField}
            />
        ) : null;

    // draw
    return (
        <div className={styles.searchField}>
            <InputField
                fullWidth
                theme="primary"
                autoFocus
                size="small"
                value={localFieldValue.get()}
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
    // props
    const { categoriesData } = props;

    // state
    const componentState = useState<IUseModifyCategoriesStore>({
        treeData: categoriesData,
        searchQuery: null,
        editableNodeDetails: null,
        selectedNode: null,
        toBeDeletedNode: null,
        toBeAddedNodeDetails: null,
    });

    // draw
    return (
        <div className={styles.modifyCategories}>
            <SearchField componentState={componentState} />
            <CategoriesView componentState={componentState} />
            <EditCategorySlider componentState={componentState} />
        </div>
    );
};
