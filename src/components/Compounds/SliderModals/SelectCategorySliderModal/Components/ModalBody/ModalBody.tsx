import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { IInputFieldProps, InputField, SliderModalBody } from '@sellerspot/universal-components';
import { CategoryView, ICategoryViewProps } from 'components/Compounds/CategoryView/CategoryView';
import { CategoryViewHandlersService } from 'components/Compounds/CategoryView/CategoryViewHandlers.service';
import { useConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { ISelectCategorySliderModalState } from 'components/Compounds/SliderModals/SelectCategorySliderModal/SelectCategorySliderModal';
import React, { ReactElement } from 'react';
import { rawClone } from 'utilities/general';
import { ICONS } from 'utilities/utilities';
import { ISelectCategorySubSliderModalState } from '../../SelectCategorySliderModal.types';
import styles from './ModalBody.module.scss';

interface IModalBodyProps {
    categorySliderModalState: State<ISelectCategorySubSliderModalState['categorySliderModal']>;
    sliderModalState: State<ISelectCategorySliderModalState>;
}

interface IModalBodyState {
    searchQuery: string;
    isLoading: boolean;
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
    const { categorySliderModalState, sliderModalState } = props;

    // state
    const modalBodyState = useState<IModalBodyState>({
        searchQuery: '',
        isLoading: false,
    });

    // hooks
    const confirmDialog = useConfirmDialog();

    // handlers
    const onSelectNodeHandler: ICategoryViewProps['onSelectNodeCallback'] = (node) => () => {
        sliderModalState.selectedCategory.set(node);
    };
    const categoryViewHandlers = new CategoryViewHandlersService({
        confirmDialogHook: confirmDialog,
        sliderModalState: categorySliderModalState,
        treeDataState: sliderModalState.treeData,
    });

    // component props
    const categoryViewProps: ICategoryViewProps = {
        treeData: rawClone(sliderModalState.treeData.get()),
        isLoading: sliderModalState.isLoading.get(),
        selectedNode: rawClone(sliderModalState.selectedCategory.get()),
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
