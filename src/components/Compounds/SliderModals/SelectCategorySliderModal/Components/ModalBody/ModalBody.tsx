import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { IInputFieldProps, InputField, SliderModalBody } from '@sellerspot/universal-components';
import { CategoryView, ICategoryViewProps } from 'components/Compounds/CategoryView/CategoryView';
import { CategoryViewHandlersService } from 'components/Compounds/CategoryView/CategoryViewHandlers.service';
import { useConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { CategoryService } from 'pages/Catalogue/Category/Category.service';
import React, { ReactElement, useEffect } from 'react';
import { TreeItem } from 'react-sortable-tree';
import { rawClone } from 'utilities/general';
import { ICONS } from 'utilities/utilities';
import { ISelectCategorySubSliderModalState } from '../../SelectCategorySliderModal.types';
import styles from './ModalBody.module.scss';

interface IModalBodyProps {
    categorySliderModalState: State<ISelectCategorySubSliderModalState['categorySliderModal']>;
    treeDataState: State<TreeItem[]>;
}

interface ICategoryViewState {
    selectedCategory: TreeItem;
    isLoading: boolean;
}

interface IModalBodyState {
    searchQuery: string;
}

type ISearchFieldProps = {
    searchQueryState: State<IModalBodyState['searchQuery']>;
};

const SearchField = (props: ISearchFieldProps) => {
    // props
    const { searchQueryState } = props;

    // handlers
    const onChangeHandler: IInputFieldProps['onChange'] = (event) => {
        searchQueryState.set(event.target.value);
    };

    // draw
    return (
        <InputField
            fullWidth
            label="Search"
            theme="primary"
            autoFocus
            prefix={<Icon icon={ICONS.outlineSearch} />}
            placeHolder="Search for categories"
            onChange={onChangeHandler}
        />
    );
};

export const ModalBody = (props: IModalBodyProps): ReactElement => {
    // props
    const { categorySliderModalState, treeDataState } = props;

    // state
    const categoryViewState = useState<ICategoryViewState>({
        selectedCategory: null,
        isLoading: true,
    });
    const modalBodyState = useState<IModalBodyState>({
        searchQuery: '',
    });

    // hooks
    const confirmDialog = useConfirmDialog();

    // handlers
    const getAllCategories = async () => {
        const allCategories = await CategoryService.getAllCategories();
        categoryViewState.merge({
            isLoading: false,
        });
        treeDataState.set(allCategories);
    };
    const onSelectNodeHandler: ICategoryViewProps['onSelectNodeCallback'] = (node) => () => {
        categoryViewState.selectedCategory.set(node);
    };
    const categoryViewHandlers = new CategoryViewHandlersService({
        confirmDialogHook: confirmDialog,
        sliderModalState: categorySliderModalState,
        treeDataState,
    });

    // component props
    const categoryViewProps: ICategoryViewProps = {
        treeData: rawClone(treeDataState.get()),
        isLoading: categoryViewState.isLoading.get(),
        selectedNode: rawClone(categoryViewState.selectedCategory.get()),
        canDragNodes: true,
        canDrop: categoryViewHandlers.canDropHandler,
        createCategoryCallback: categoryViewHandlers.createCategoryHandler,
        deleteCategoryCallback: categoryViewHandlers.deleteCategoryHandler,
        editCategoryCallback: categoryViewHandlers.editCategoryHandler,
        onChangeCallback: categoryViewHandlers.onChangeHandler,
        onMoveNode: categoryViewHandlers.onMoveNodeHandler,
        searchQuery: rawClone(modalBodyState.searchQuery.get()),
        onSelectNodeCallback: onSelectNodeHandler,
    };

    // effects
    useEffect(() => {
        getAllCategories();
    }, []);

    // draw
    return (
        <SliderModalBody>
            <div className={styles.wrapper}>
                <SearchField searchQueryState={modalBodyState.searchQuery} />
                <CategoryView {...categoryViewProps} />
            </div>
        </SliderModalBody>
    );
};
