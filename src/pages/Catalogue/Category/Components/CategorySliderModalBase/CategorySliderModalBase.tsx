import { State } from '@hookstate/core';
import { CategorySlider } from 'components/Compounds/SliderModals/CategorySlider/CategorySlider';
import { CategorySliderService } from 'components/Compounds/SliderModals/CategorySlider/CategorySlider.service';
import { ICategorySliderProps } from 'components/Compounds/SliderModals/CategorySlider/CategorySlider.types';
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
    sliderState: State<ICategoryPageState['sliderModal']>;
}

export const CategorySliderModalBase = (props: ICategorySliderModalBaseProps): ReactElement => {
    // props
    const { treeData, sliderState } = props;

    // refs
    const categorySliderFormRef: ICategorySliderProps['formRef'] = useRef(null);

    // handler
    const onCloseHandler: ICategorySliderProps['onClose'] = (onCloseProps) => {
        // props
        CategorySliderService.handleOnCloseCategorySliderModal({
            onCloseProps,
            sliderState: {
                showModal: sliderState.showModal,
            },
        });
    };
    const onSubmitHandler: ICategorySliderProps['onSubmit'] = async ({ values }) => {
        // values
        const { name } = values;
        const currentNodeId = sliderState.contextData.currentNode.get()?.id ?? null;
        // checking mode
        if (sliderState.mode.get() === 'create') {
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
        sliderState.showModal.set(false);
    };

    // compile data
    const categorySliderProps: ICategorySliderProps = {
        showModal: sliderState.showModal.get(),
        formRef: categorySliderFormRef,
        level: 1,
        mode: sliderState.mode.get(),
        prefillData: sliderState.prefillData.get(),
        contextData: rawClone(sliderState.contextData.get()),
        onClose: onCloseHandler,
        onSubmit: onSubmitHandler,
    };

    // draw
    return <CategorySlider {...categorySliderProps} />;
};
