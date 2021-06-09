import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { IconButton, IInputFieldProps, InputField } from '@sellerspot/universal-components';
import { debounce } from 'lodash';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import styles from './Categories.module.scss';
import { IUseCategoriesStore } from './Categories.types';
import { CategoriesView } from './Components/CategoriesView/CategoriesView';
import { EditCategorySlider } from './Components/CategoriesView/Components/EditCategorySlider/EditCategorySlider';

export { ICategoriesProps } from './Categories.types';

const SearchField = (props: { componentState: State<IUseCategoriesStore> }) => {
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

export const Categories = (): ReactElement => {
    // state
    const componentState = useState<IUseCategoriesStore>({
        treeData: [
            {
                id: 'incididunt',
                title: 'Shirts',
                children: [
                    {
                        id: 'exd',
                        title: 'T-Shirt',
                    },
                    {
                        id: 'in',
                        title: 'Formals',
                    },
                    {
                        id: 'nullafa',
                        title: 'Casuals',
                    },
                ],
            },
            {
                id: 'cupidatat',
                title: 'Shoes',
                children: [
                    {
                        id: 'nostrud',
                        title: 'Casuals',
                        children: [
                            {
                                id: 'nulla',
                                title: 'Lace',
                            },
                            {
                                id: 'irure',
                                title: 'Velcro',
                            },
                        ],
                    },
                    {
                        id: 'ex',
                        title: 'Office',
                    },
                ],
            },
            {
                id: 'cupidatat',
                title: 'Shoes',
                children: [
                    {
                        id: 'nostrud',
                        title: 'Casuals',
                        children: [
                            {
                                id: 'nulla',
                                title: 'Lace',
                            },
                            {
                                id: 'irure',
                                title: 'Velcro',
                            },
                        ],
                    },
                    {
                        id: 'ex',
                        title: 'Office',
                    },
                ],
            },
            {
                id: 'cupidatat',
                title: 'Shoes',
                children: [
                    {
                        id: 'nostrud',
                        title: 'Casuals',
                        children: [
                            {
                                id: 'nulla',
                                title: 'Lace',
                            },
                            {
                                id: 'irure',
                                title: 'Velcro',
                            },
                        ],
                    },
                    {
                        id: 'ex',
                        title: 'Office',
                    },
                ],
            },
        ],
        searchQuery: null,
        editableNodeDetails: null,
        selectedNode: null,
        toBeDeletedNode: null,
        toBeAddedNodeDetails: null,
    });

    // draw
    return (
        <div className={styles.wrapper}>
            <SearchField componentState={componentState} />
            <CategoriesView componentState={componentState} />
            <EditCategorySlider componentState={componentState} />
        </div>
    );
};
