import { State } from '@hookstate/core';
import {
    addNodeUnderParent,
    changeNodeAtPath,
    find,
    insertNode,
    TreeItem,
} from 'react-sortable-tree';
import { requests } from 'requests/requests';
import { getNodeKey, rawClone } from 'utilities/general';
import { CategorySliderModalService } from './CategorySliderModal.service';
import { ICategorySliderModalProps } from './CategorySliderModal.types';

interface ICategorySliderModalHandlersProps {
    treeDataState: State<TreeItem[]>;
    sliderModalState: State<
        Pick<ICategorySliderModalProps, 'showModal' | 'prefillData' | 'mode' | 'contextData'>
    >;
}

interface ICreateCategoryProps {
    title: string;
    parentId: string;
}

interface IUpdateCategoryProps {
    categoryId: string;
    title: string;
}

export class CategorySliderModalHandlers {
    private treeDataState: ICategorySliderModalHandlersProps['treeDataState'] = null;
    private sliderModalState: ICategorySliderModalHandlersProps['sliderModalState'] = null;

    constructor(props: ICategorySliderModalHandlersProps) {
        const { treeDataState, sliderModalState } = props;
        this.treeDataState = treeDataState;
        this.sliderModalState = sliderModalState;
    }

    private createCategory = async (props: ICreateCategoryProps): Promise<TreeItem> => {
        // request
        const { data, status } = await requests.catalogue.categoryRequest.createNewCategory(props);
        if (status) {
            return data;
        }
        return null;
    };
    private updateCategory = async (props: IUpdateCategoryProps): Promise<TreeItem> => {
        // request
        const { data, status } = await requests.catalogue.categoryRequest.editCategory(props);
        if (status) {
            return data;
        }
        return null;
    };

    onSubmitHandler: ICategorySliderModalProps['onSubmit'] = async ({ values }) => {
        // values
        const { name } = values;
        const currentNodeId = this.sliderModalState.contextData.currentNode.get()?.id ?? null;
        const treeData = rawClone<TreeItem[]>(this.treeDataState && this.treeDataState.get());

        // checking mode
        if (this.sliderModalState.mode.get() === 'create') {
            // calling service
            const createdNode = await this.createCategory({
                parentId: currentNodeId,
                title: name,
            });
            if (!!currentNodeId) {
                // updating tree
                treeData &&
                    this.treeDataState.set(
                        addNodeUnderParent({
                            treeData: treeData,
                            newNode: createdNode,
                            getNodeKey,
                            addAsFirstChild: true,
                            expandParent: true,
                            parentKey: rawClone(currentNodeId),
                            ignoreCollapsed: false,
                        }).treeData,
                    );
            } else {
                treeData &&
                    this.treeDataState.set(
                        insertNode({
                            depth: 0,
                            minimumTreeIndex: 0,
                            getNodeKey,
                            newNode: createdNode,
                            treeData: treeData,
                            expandParent: true,
                            ignoreCollapsed: false,
                        }).treeData,
                    );
            }
        } else {
            // calling service
            const updatedNode = await this.updateCategory({
                categoryId: currentNodeId,
                title: name,
            });
            const { node, path } = find({
                getNodeKey,
                treeData: treeData,
                searchMethod: (searchData) => searchData.node.id === searchData.searchQuery,
                searchQuery: currentNodeId,
            }).matches[0];
            // updating tree
            treeData &&
                this.treeDataState.set(
                    changeNodeAtPath({
                        path,
                        newNode: {
                            ...node,
                            title: updatedNode.title,
                        },
                        treeData: treeData,
                        ignoreCollapsed: false,
                        getNodeKey,
                    }),
                );
        }
        this.sliderModalState && this.sliderModalState.showModal.set(false);
    };

    onCloseHandler: ICategorySliderModalProps['onClose'] = (onCloseProps) => {
        // props
        CategorySliderModalService.handleOnCloseCategorySliderModal({
            onCloseProps,
            sliderModalState: {
                showModal: this.sliderModalState.showModal,
            },
        });
    };
}
