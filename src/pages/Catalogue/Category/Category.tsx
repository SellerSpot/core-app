import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button, IconButton, IInputFieldProps, InputField } from '@sellerspot/universal-components';
import { debounce } from 'lodash';
import React, { ReactElement, useEffect } from 'react';
import { getNodeAtPath } from 'react-sortable-tree';
import { rawClone } from 'utilities/general';
import { ICONS } from 'utilities/utilities';
import { PageHeader } from '../../../components/Compounds/PageHeader/PageHeader';
import styles from './Category.module.scss';
import { CategoryService } from './Category.service';
import { ICategoryPageState } from './Category.types';
import { CategorySliderModalBase } from './Components/CategorySliderModalBase/CategorySliderModalBase';
import { CategoryViewBase } from './Components/CategoryViewBase/CategoryViewBase';

export { ICategoryProps } from './Category.types';

const PageHeaderComponent = (props: { pageState: State<ICategoryPageState> }) => {
    // props
    const { pageState } = props;

    // components
    const NewCategoryButton = () => {
        // handler

        const onClickHandler = () => {
            // getting the root node (since the node needs sibling of the root)
            const rootNode = getNodeAtPath({
                getNodeKey: (data) => data.node.id,
                path: [],
                treeData: rawClone(pageState.treeData.get()),
                ignoreCollapsed: false,
            }).node;
            pageState.sliderModal.set({
                showModal: true,
                prefillData: null,
                contextData: {
                    currentNode: null,
                    parentNode: rootNode,
                },
                mode: 'create',
            });
        };

        // draw
        return (
            <Button
                label="NEW CATEGORY"
                startIcon={<Icon icon={ICONS.outlineAdd} />}
                variant="contained"
                onClick={onClickHandler}
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
    const pageState = useState<ICategoryPageState>({
        treeData: [],
        searchQuery: '',
        selectedNode: null,
        isLoading: true,
        sliderModal: {
            showModal: false,
            prefillData: null,
            contextData: null,
            mode: 'create',
        },
    });

    const getAllCategories = async () => {
        const allCategories = await CategoryService.getAllCategories();
        pageState.treeData.set(allCategories);
        pageState.isLoading.set(false);
    };

    // effects
    useEffect(() => {
        getAllCategories();
    }, []);

    // draw
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent pageState={pageState} />
            <CategoryViewBase pageState={pageState} />
            <CategorySliderModalBase
                treeData={pageState.treeData}
                sliderState={pageState.sliderModal}
            />
        </div>
    );
};
