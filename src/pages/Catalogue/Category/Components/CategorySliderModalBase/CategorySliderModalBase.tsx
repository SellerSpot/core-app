import { State } from '@hookstate/core';
import { CategorySliderModal } from 'components/Compounds/SliderModals/CategorySliderModal/CategorySlider';
import { CategorySliderService } from 'components/Compounds/SliderModals/CategorySliderModal/CategorySlider.service';
import { ICategorySliderModalProps } from 'components/Compounds/SliderModals/CategorySliderModal/CategorySlider.types';
import React, { ReactElement, useRef } from 'react';
import {
    addNodeUnderParent,
    changeNodeAtPath,
    find,
    insertNode,
    TreeItem,
} from 'react-sortable-tree';
import { rawClone } from 'utilities/general';
import { ICategoryPageState } from '../../Category.types';
import { CategorySliderModalBaseService } from './CategorySliderModalBase.service';

interface ICategorySliderModalBaseProps {
    treeData: State<TreeItem[]>;
    sliderModalState: State<ICategoryPageState['sliderModal']>;
}

export const CategorySliderModalBase = (props: ICategorySliderModalBaseProps): ReactElement => {
    // props
    const { treeData, sliderModalState } = props;

    // refs
    const categorySliderFormRef: ICategorySliderModalProps['formRef'] = useRef(null);

    // handler
    const onCloseHandler: ICategorySliderModalProps['onClose'] = (onCloseProps) => {
        // props
        CategorySliderService.handleOnCloseCategorySliderModal({
            onCloseProps,
            sliderModalState: {
                showModal: sliderModalState.showModal,
            },
        });
    };
    const onSubmitHandler: ICategorySliderModalProps['onSubmit'] = async ({ values }) => {
        // values
        const { name } = values;
        const currentNodeId = sliderModalState.contextData.currentNode.get()?.id ?? null;
        // checking mode
        if (sliderModalState.mode.get() === 'create') {
            // calling service
            const createdNode = await CategorySliderModalBaseService.createCategory({
                parentId: currentNodeId,
                title: name,
            });
            if (!!currentNodeId) {
                // updating tree
                treeData.set(
                    addNodeUnderParent({
                        treeData: rawClone(treeData.get()),
                        newNode: createdNode,
                        getNodeKey: (data) => data.node.id,
                        addAsFirstChild: true,
                        expandParent: true,
                        parentKey: rawClone(currentNodeId),
                        ignoreCollapsed: false,
                    }).treeData,
                );
            } else {
                treeData.set(
                    insertNode({
                        depth: 0,
                        minimumTreeIndex: 0,
                        getNodeKey: (data) => data.node.id,
                        newNode: createdNode,
                        treeData: rawClone(treeData.get()),
                        expandParent: true,
                        ignoreCollapsed: false,
                    }).treeData,
                );
            }
        } else {
            // calling service
            const updatedNode = await CategorySliderModalBaseService.updateCategory({
                categoryId: currentNodeId,
                title: name,
            });
            const { node, path } = find({
                getNodeKey: (data) => data.node.id,
                treeData: rawClone(treeData.get()),
                searchMethod: (searchData) => searchData.node.id === searchData.searchQuery,
                searchQuery: currentNodeId,
            }).matches[0];
            // updating tree
            treeData.set(
                changeNodeAtPath({
                    path,
                    newNode: {
                        ...node,
                        title: updatedNode.title,
                    },
                    treeData: rawClone(treeData.get()),
                    ignoreCollapsed: false,
                    getNodeKey: (data) => data.node.id,
                }),
            );
        }
        sliderModalState.showModal.set(false);
    };

    // compile data
    const categorySliderModalProps: ICategorySliderModalProps = {
        showModal: sliderModalState.showModal.get(),
        formRef: categorySliderFormRef,
        level: 1,
        mode: sliderModalState.mode.get(),
        prefillData: sliderModalState.prefillData.get(),
        contextData: rawClone(sliderModalState.contextData.get()),
        onClose: onCloseHandler,
        onSubmit: onSubmitHandler,
    };

    // draw
    return <CategorySliderModal {...categorySliderModalProps} />;
};
