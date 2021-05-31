import { colorThemes, showNotify } from '@sellerspot/universal-components';
import { useModifyCategoriesStore } from 'components/Compounds/ModifyCategories/ModifyCategories';
import { ModifyCategoriesService } from 'components/Compounds/ModifyCategories/services/ModifyCategories.service';
import { ModifyCategoriesNodeDataStore } from 'components/Compounds/ModifyCategories/services/ModifyCategoriesNodeDataStore.service';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import SortableTree, {
    ExtendedNodeData,
    isDescendant,
    ReactSortableTreeProps,
} from 'react-sortable-tree';
import { themeSelector } from 'store/models/theme';
import { ModifyCategoriesNodeButtons } from './Components/ModifyCategoriesNodeButtons';

export const SortableTreeComponent = (): ReactElement => {
    const themeState = useSelector(themeSelector);
    const modifyCategoriesStore = useModifyCategoriesStore();
    const {
        treeData,
        searchQuery,
        editableNodeDetails,
        toBeDeletedNode,
        selectedNode,
        setTreeData,
        setSelectedNode,
    } = modifyCategoriesStore;

    const canDropCallback: ReactSortableTreeProps['canDrop'] = (props) => {
        return ModifyCategoriesService.canDropCategory({
            dropProps: props,
            treeData,
        });
    };

    const generateNodePropsHandler = (data: ExtendedNodeData) => {
        const { node } = data;
        const nodeId = node.id;
        const nodeTitle = `${node.title}`;
        const editableNode = editableNodeDetails?.node;
        const isEditable = editableNode?.id === nodeId || node.createdNew;
        const isSelected = selectedNode?.id === nodeId;
        const isParentNode = !!selectedNode ? isDescendant(node, selectedNode) : false;
        const isToBeDeleted = nodeId === toBeDeletedNode?.id;

        // creating data store instance
        const nodeInstance = new ModifyCategoriesNodeDataStore({
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
                    setSelectedNode(null);
                } else {
                    setSelectedNode(node);
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
                    <ModifyCategoriesNodeButtons nodeInstance={nodeInstance} />
                </div>,
            ],
            onClick: nodeOnClickHandler,
            style: nodeInstance.getNodeStyle(),
        };
    };

    return (
        <SortableTree
            rowHeight={80}
            treeData={treeData}
            searchQuery={searchQuery}
            canDrop={canDropCallback}
            searchMethod={ModifyCategoriesService.generalSearchMethod}
            onChange={setTreeData}
            generateNodeProps={generateNodePropsHandler}
        />
    );
};
