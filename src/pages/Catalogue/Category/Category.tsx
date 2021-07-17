import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button, IconButton, IInputFieldProps, InputField } from '@sellerspot/universal-components';
import { debounce } from 'lodash';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import { PageHeader } from '../../../components/Compounds/PageHeader/PageHeader';
import styles from './Category.module.scss';
import { IUseCategoryStore } from './Category.types';

export { ICategoryProps } from './Category.types';

const PageHeaderComponent = (props: { pageState: State<IUseCategoryStore> }) => {
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
                    size="small"
                    variant="standard"
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

export const Category = (): ReactElement => {
    // state
    const pageState = useState<IUseCategoryStore>({
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
            {/* <CategoryView pageState={pageState} /> */}
        </div>
    );
};
