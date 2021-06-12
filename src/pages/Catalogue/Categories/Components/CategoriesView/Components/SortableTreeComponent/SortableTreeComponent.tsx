import { State } from '@hookstate/core';
import { colorThemes, showNotify } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import SortableTree, {
    ExtendedNodeData,
    isDescendant,
    ReactSortableTreeProps,
    TreeItem,
} from 'react-sortable-tree';
import { themeSelector } from 'store/models/theme';
import { rawClone } from 'utilities/general';
import { IUseCategoriesStore } from '../../../../Categories.types';
import { CategoriesService } from '../../../../services/Categories.service';
import { CategoriesNodeDataStore } from '../../../../services/CategoriesNodeDataStore.service';
import { CategoriesNodeButtons } from './Components/ModifyCategoriesNodeButtons';

export const SortableTreeComponent = (props: {
    pageState: State<IUseCategoriesStore>;
}): ReactElement => {
    // props
    const { pageState } = props;

    // state
    const state = pageState;
    const { treeData, searchQuery, editableNodeDetails, toBeDeletedNode, selectedNode } = state;
    const themeState = useSelector(themeSelector);

    // handler
    const canDropCallback: ReactSortableTreeProps['canDrop'] = (props) => {
        return CategoriesService.canDropCategory({
            dropProps: props,
            treeData: treeData.get(),
        });
    };

    // compute
    const generateNodePropsHandler = (data: ExtendedNodeData) => {
        const { node } = data;
        const nodeId = node.id;
        const nodeTitle = `${node.title}`;
        const editableNode = editableNodeDetails?.node;
        const isEditable = editableNode?.id === nodeId || node.createdNew;
        const isSelected = selectedNode?.id === nodeId;
        const isParentNode = !!selectedNode ? isDescendant(node, selectedNode) : false;
        const isToBeDeleted = nodeId === toBeDeletedNode?.id;

        // data store
        // creating data store instance
        const nodeInstance = new CategoriesNodeDataStore({
            data,
            colors: colorThemes[themeState.colorTheme],
            isEditable,
            isParentNode,
            isSelected,
            isToBeDeleted,
        });

        // 'any' because no typing is provided for the onClick event in react-sortable-tree
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const nodeOnClickHandler = (event: any) => {
            const eventClass = event?.target?.className;
            const isNodeClicked =
                eventClass === 'rst__rowContents' ||
                eventClass === 'nodeTitle' ||
                eventClass === 'rst__rowLabel';

            if (isNodeClicked) {
                if (selectedNode?.id === nodeId) {
                    selectedNode.set(null);
                } else {
                    selectedNode.set(node);
                    showNotify(`Selected ${nodeTitle} category`, {
                        autoHideDuration: 3000,
                        showNotifyAction: true,
                        placement: 'bottomLeft',
                        theme: 'success',
                    });
                }
            }
        };
        return {
            title: <h5 className="nodeTitle">{nodeTitle}</h5>,
            buttons: [
                <div key={'controls'}>
                    <CategoriesNodeButtons nodeInstance={nodeInstance} pageState={state} />
                </div>,
            ],
            onClick: nodeOnClickHandler,
            style: nodeInstance.getNodeStyle(),
        };
    };
    const handleSortableTreeOnChange = (treeDataChanged: TreeItem[]) => {
        treeData.set(treeDataChanged);
    };

    // draw
    return (
        <SortableTree
            rowHeight={80}
            treeData={rawClone<TreeItem[]>(treeData.value)}
            isVirtualized={false}
            searchQuery={searchQuery}
            canDrop={canDropCallback}
            searchMethod={CategoriesService.generalSearchMethod}
            onChange={handleSortableTreeOnChange}
            generateNodeProps={generateNodePropsHandler}
        />
    );
};
