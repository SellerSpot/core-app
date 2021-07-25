import { State, useState } from '@hookstate/core';
import { CategoryView, ICategoryViewProps } from 'components/Compounds/CategoryView/CategoryView';
import { useConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { uniq } from 'lodash';
import React, { ReactElement } from 'react';
import { find, getNodeAtPath, removeNodeAtPath, TreeItem } from 'react-sortable-tree';
import { rawClone } from 'utilities/general';
import { ICategoryPageState } from '../../Category.types';
import { CategoryViewBaseService } from './CategoryViewBase.service';

interface ICategoryViewBaseProps {
    pageState: State<ICategoryPageState>;
}

interface INodeMovementTracker {
    previousParent: TreeItem;
    nextParent: TreeItem;
}

export const CategoryViewBase = (props: ICategoryViewBaseProps): ReactElement => {
    // props
    const { pageState: mainPageState } = props;

    // local state
    const pageState = useState(mainPageState);

    // hooks
    const { confirm, closeDialog, setLoading } = useConfirmDialog();

    // used to track the movement of the nodes (previous and next parent, etc)
    const nodeMovementTracker: INodeMovementTracker = {
        nextParent: null,
        previousParent: null,
    };

    // handlers
    const canDropHandler: ICategoryViewProps['canDrop'] = (props) => {
        // props
        const { node, nextParent, prevParent } = props;

        // setting the movement tracker
        nodeMovementTracker.previousParent = prevParent;
        nodeMovementTracker.nextParent = nextParent;

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
    const createCategoryHandler: ICategoryViewProps['createCategoryCallback'] = (currentNode) => {
        // setting state
        pageState.sliderModal.set({
            showModal: true,
            mode: 'create',
            prefillData: null,
            contextData: {
                currentNode,
            },
        });
    };
    const deleteCategoryHandler: ICategoryViewProps['deleteCategoryCallback'] = async (props) => {
        // props
        const { id, title } = props;
        // getting confirmation
        const confirmResult = await confirm({
            title: 'Are you sure?',
            theme: 'warning',
            content: `This will permanentaly delete category "${title}"`,
            primaryButtonProps: {
                label: 'DELETE',
                theme: 'danger',
            },
            secondaryButtonProps: {
                label: 'CANCEL',
                theme: 'primary',
            },
        });
        if (confirmResult) {
            setLoading({ isLoading: true });
            await CategoryViewBaseService.deleteCategory({
                categoryId: id,
            });
            // finding the node to remove (to get the path)
            const { path } = find({
                getNodeKey: (data) => data.node.id,
                treeData: rawClone(pageState.treeData.get()),
                searchMethod: (searchData) => searchData.node.id === searchData.searchQuery,
                searchQuery: id,
            }).matches[0];
            // updating tree state
            pageState.treeData.set(
                removeNodeAtPath({
                    getNodeKey: (data) => data.node.id,
                    path,
                    treeData: rawClone(pageState.treeData.get()),
                    ignoreCollapsed: false,
                }),
            );
            setLoading({ isLoading: false });
        }
        closeDialog();
    };

    const editCategoryHandler: ICategoryViewProps['editCategoryCallback'] = (currentNode) => {
        // props
        const { id } = currentNode;

        // finding the parent node (to find siblings when editing)
        // getting path of current node
        const requiredNodePath = find({
            getNodeKey: (data) => data.node.id,
            searchMethod: (searchData) => searchData.node.id === searchData.searchQuery,
            treeData: rawClone(pageState.treeData.get()),
            searchQuery: id,
        }).matches[0].path;
        // altering path
        requiredNodePath.pop();
        // getting parent node using modified path
        const parentNode = getNodeAtPath({
            getNodeKey: (data) => data.node.id,
            path: requiredNodePath,
            treeData: rawClone(pageState.treeData.get()),
            ignoreCollapsed: false,
        }).node;

        // setting state
        pageState.sliderModal.set({
            showModal: true,
            mode: 'edit',
            prefillData: {
                name: currentNode.title as string,
            },
            contextData: {
                currentNode,
                parentNode: parentNode,
            },
        });
    };
    const onChangeHandler: ICategoryViewProps['onChangeCallback'] = (treeData) => {
        pageState.treeData.set(treeData);
    };
    const onMoveNode: ICategoryViewProps['onMoveNode'] = (props) => {
        // props
        const { node } = props;
        const nextParentId = nodeMovementTracker.nextParent?.id ?? null;
        const previousParentId = nodeMovementTracker.previousParent?.id ?? null;
        // deciding the type of movement
        if (nextParentId === previousParentId) {
            // making sure it is not a top level
            if (!!nextParentId) {
                // getting children order
                const childrenOrder: string[] = (
                    nodeMovementTracker.nextParent.children as TreeItem[]
                ).map((child) => child.id);
                // updating server
                CategoryViewBaseService.editChildrenOrder({
                    childrenOrder: uniq(childrenOrder),
                    parentId: nextParentId,
                });
            }
        } else {
            CategoryViewBaseService.editCategoryPosition({
                categoryId: node.id,
                newParentId: nextParentId,
                oldParentId: previousParentId,
            });
        }
    };

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
        onMoveNode: onMoveNode,
    };

    // draw
    return <CategoryView {...categoryViewProps} />;
};
