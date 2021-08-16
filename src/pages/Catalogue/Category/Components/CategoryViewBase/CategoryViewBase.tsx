import { State, useState } from '@hookstate/core';
import { CategoryView, ICategoryViewProps } from 'components/Compounds/CategoryView/CategoryView';
import { CategoryViewHandlersService } from 'components/Compounds/CategoryView/CategoryViewHandlers.service';
import { useConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import React, { ReactElement } from 'react';
import { rawClone } from 'utilities/general';
import { ICategoryPageState } from '../../Category.types';

interface ICategoryViewBaseProps {
    pageState: State<ICategoryPageState>;
}

export const CategoryViewBase = (props: ICategoryViewBaseProps): ReactElement => {
    // props
    const { pageState: mainPageState } = props;

    // local state
    const pageState = useState(mainPageState);

    // hooks
    const confirmDialogHook = useConfirmDialog();

    // handlers
    const {
        canDropHandler,
        createCategoryHandler,
        deleteCategoryHandler,
        onChangeHandler,
        editCategoryHandler,
        onMoveNodeHandler,
    } = new CategoryViewHandlersService({
        sliderModalState: pageState.sliderModal,
        treeDataState: pageState.treeData,
        confirmDialogHook: confirmDialogHook,
    });

    // handlers

    // compiling data
    const categoryViewProps: ICategoryViewProps = {
        canDragNodes: true,
        treeData: rawClone(pageState.treeData.get()),
        isLoading: pageState.isLoading.get(),
        selectedNode: rawClone(pageState.selectedNode.get()),
        searchQuery: rawClone(pageState.searchQuery.get()),
        canDrop: canDropHandler,
        createCategoryCallback: createCategoryHandler,
        deleteCategoryCallback: deleteCategoryHandler,
        editCategoryCallback: editCategoryHandler,
        onChangeCallback: onChangeHandler,
        onMoveNode: onMoveNodeHandler,
    };

    // draw
    return <CategoryView {...categoryViewProps} />;
};
