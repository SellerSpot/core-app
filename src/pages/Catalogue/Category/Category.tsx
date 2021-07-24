import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button, IconButton, IInputFieldProps, InputField } from '@sellerspot/universal-components';
import { CategoryView, ICategoryViewProps } from 'components/Compounds/CategoryView/CategoryView';
import { debounce } from 'lodash';
import React, { ReactElement, useEffect } from 'react';
import { TreeItem } from 'react-sortable-tree';
import { introduceDelay, rawClone } from 'utilities/general';
import { ICONS } from 'utilities/utilities';
import { PageHeader } from '../../../components/Compounds/PageHeader/PageHeader';
import styles from './Category.module.scss';
import { ICategoryPageState } from './Category.types';
import { CategorySliderModalBase } from './Components/CategorySliderModalBase/CategorySliderModalBase';

export { ICategoryProps } from './Category.types';

const PageHeaderComponent = (props: { pageState: State<ICategoryPageState> }) => {
    // props
    const { pageState } = props;

    // components
    const NewCategoryButton = () => {
        return (
            <Button
                label="NEW CATEGORY"
                startIcon={<Icon icon={ICONS.outlineAdd} />}
                variant="contained"
                theme="primary"
            />
        );
    };
    const SearchField = () => {
        // state
        const { searchQuery } = useState(pageState);
        const localFieldValue = useState(searchQuery);

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
        searchQuery: null,
        selectedNode: null,
        isLoading: true,
        sliderModal: {
            showModal: false,
            prefillData: null,
            mode: 'create',
        },
    });

    // handlers
    const onSelectNodeHandler: ICategoryViewProps['onSelectNodeCallback'] = (node) => () => {
        pageState.selectedNode.set(node);
    };
    const canDropHandler: ICategoryViewProps['canDrop'] = (props) => {
        // props
        const { node, nextParent } = props;

        // variables
        const nextSiblings = nextParent?.children as TreeItem[];

        // compute
        if (!!nextSiblings) {
            const doesHaveSiblingWithSameName = nextSiblings.some(
                (sibling) => sibling.id !== node.id && sibling.title === node.title,
            );
            if (doesHaveSiblingWithSameName) {
                return false;
            }
        }
        return true;
    };
    const createCategoryHandler: ICategoryViewProps['createCategoryCallback'] = (props) => {
        // props
        const { id } = props;
        // setting state
        pageState.sliderModal.set({
            showModal: true,
            mode: 'create',
            prefillData: null,
            contextData: {
                categoryId: id,
            },
        });
    };
    const deleteCategoryHandler: ICategoryViewProps['deleteCategoryCallback'] = () => {
        console.log('Delete Category');
    };
    const editCategoryHandler: ICategoryViewProps['editCategoryCallback'] = () => {
        console.log('Edit Category');
    };
    const onChangeHandler: ICategoryViewProps['onChangeCallback'] = (treeData) => {
        pageState.treeData.set(treeData);
    };
    const onMoveNode: ICategoryViewProps['onMoveNode'] = () => {
        console.log('OnMoveNode');
    };
    const getAllCategories = async () => {
        await introduceDelay(1000);
        // const allCategories = await CategoryService.getAllCategories();

        pageState.treeData.set([
            {
                id: 'redbull',
                title: 'Red Bull',
                children: [
                    {
                        id: 'alpine1',
                        title: 'Alpine',
                    },
                ],
            },
            {
                id: 'mclaren',
                title: 'McLaren',
            },
            {
                id: 'alpine',
                title: 'Alpine',
            },
        ]);
        pageState.isLoading.set(false);
    };

    // compiling data
    const categoryViewProps: ICategoryViewProps = {
        treeData: rawClone(pageState.treeData.get()),
        isLoading: pageState.isLoading.get(),
        selectedNode: rawClone(pageState.selectedNode.get()),
        searchQuery: rawClone(pageState.searchQuery.get()),
        onSelectNodeCallback: onSelectNodeHandler,
        canDrop: canDropHandler,
        createCategoryCallback: createCategoryHandler,
        deleteCategoryCallback: deleteCategoryHandler,
        editCategoryCallback: editCategoryHandler,
        onChangeCallback: onChangeHandler,
        onMoveNode: onMoveNode,
    };

    // effects
    useEffect(() => {
        getAllCategories();
    }, []);

    // draw
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent pageState={pageState} />
            <CategoryView {...categoryViewProps} />
            <CategorySliderModalBase
                sliderState={pageState.sliderModal}
                getAllCategories={getAllCategories}
            />
        </div>
    );
};
