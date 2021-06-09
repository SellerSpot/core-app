import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button, IconButton, IInputFieldProps, InputField } from '@sellerspot/universal-components';
import { debounce } from 'lodash';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import { PageHeader } from '../../../components/Compounds/PageHeader/PageHeader';
import styles from './Categories.module.scss';
import { IUseCategoriesStore } from './Categories.types';
import { CategoriesView } from './Components/CategoriesView/CategoriesView';

export { ICategoriesProps } from './Categories.types';

const PageHeaderComponent = (props: { pageState: State<IUseCategoriesStore> }) => {
    // props
    const { pageState } = props;

    // components
    const NewCategoryButton = () => {
        return (
            <Button
                label={'NEW CATEGORY'}
                startIcon={<Icon icon={ICONS.outlineAdd} />}
                variant="contained"
                theme="primary"
            />
        );
    };
    const SearchField = () => {
        // state
        const { searchQuery } = useState(pageState);
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
        return (
            <div className={styles.searchField}>
                <InputField
                    fullWidth
                    theme="primary"
                    autoFocus
                    size="small"
                    label="Hi there"
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

    return (
        <PageHeader
            title={'Categories'}
            actions={[
                <SearchField key={'searchField'} />,
                <NewCategoryButton key={'newCategoryButton'} />,
            ]}
        />
    );
};

export const Categories = (): ReactElement => {
    // state
    const pageState = useState<IUseCategoriesStore>({
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
            <PageHeaderComponent pageState={pageState} />
            <CategoriesView pageState={pageState} />
        </div>
    );
};
