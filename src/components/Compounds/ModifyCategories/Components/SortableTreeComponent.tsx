import { colorThemes } from 'config/themes';
import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import SortableTree, { isDescendant, TreeItem } from 'react-sortable-tree';
import { themeSelector } from 'store/models/theme';
import { ModifyCategoriesService } from '../ModifyCategories.service';
import { TSetSortableTreeDataState } from '../ModifyCategories.types';
import { EditCategoryTitle } from './EditCategoryTitle';
import styles from '../ModifyCategories.module.scss';

const getNodeKey = ({ treeIndex }: { treeIndex: number }) => treeIndex;

const DeleteConfirmTitle = (props: { nodeTitle: string }) => {
    const { nodeTitle } = props;
    return (
        <div className={styles.deleteConfirmTitleWrapper}>
            <h5>Are you sure...</h5>
            <h6>
                you want to <span className={styles.deleteText}>{'delete '}</span>
                <span className={styles.deleteCategoryText}>{nodeTitle}</span> category?
            </h6>
        </div>
    );
};

export const SortableTreeComponent = (props: {
    sortableTreeDataState: TreeItem[];
    searchQuery: string;
    setSortableTreeDataState: TSetSortableTreeDataState;
}): ReactElement => {
    const themeState = useSelector(themeSelector);
    const { sortableTreeDataState, searchQuery, setSortableTreeDataState } = props;
    // holds the id of the node that can be edited
    const [editableNodeId, setEditableNodeId] = useState<string>(null);
    // holds the id of the selected node
    const [selectedNode, setSelectedNode] = useState<TreeItem>(null);
    // holds the id of the node to be deleted
    const [toBeDeletedNode, setToBeDeletedNode] = useState<TreeItem>(null);

    return (
        <SortableTree
            rowHeight={80}
            treeData={sortableTreeDataState}
            searchQuery={searchQuery}
            onChange={setSortableTreeDataState}
            generateNodeProps={(data) => {
                const { node, path } = data;
                const nodeTitle = node.title + '';
                const nodeId = node.id;
                const isEditable = editableNodeId === nodeId || node.createdNew;
                const isSelected = selectedNode?.id === nodeId;
                const isParentNodeForSelectedNode = !!selectedNode
                    ? isDescendant(node, selectedNode)
                    : false;
                const isToBeDeleted = node.id === toBeDeletedNode?.id;

                const nodeStyle = ModifyCategoriesService.getTreeNodeStyle({
                    colors: colorThemes[themeState.colorTheme],
                    isParentNodeForSelectedNode,
                    isSelected,
                });

                const switchToEditMode = (
                    event: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
                ) => {
                    event.stopPropagation();
                    setEditableNodeId(nodeId);
                };

                // 'any' because no typing is provided for the onClick event in react-sortable-tree
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const nodeOnClickHandler = (event: any) => {
                    if (event?.target?.className === 'rst__rowContents') {
                        if (selectedNode?.id === node.id) {
                            setSelectedNode(null);
                        } else {
                            setSelectedNode(node);
                        }
                    }
                };

                return {
                    title: isEditable ? (
                        <EditCategoryTitle
                            nodeTitle={nodeTitle}
                            path={path as string[]}
                            getNodeKey={getNodeKey}
                            setSortableTreeDataState={setSortableTreeDataState}
                            sortableTreeDataState={sortableTreeDataState}
                            node={node}
                            setEditableNodeId={setEditableNodeId}
                        />
                    ) : isToBeDeleted ? (
                        <DeleteConfirmTitle nodeTitle={nodeTitle} />
                    ) : (
                        <h5 onClick={switchToEditMode}>{nodeTitle}</h5>
                    ),
                    buttons: ModifyCategoriesService.getSortableTreeButtons({
                        getNodeKey,
                        nodeTitle,
                        path: path as string[],
                        treeData: sortableTreeDataState,
                        setSortableTreeDataState,
                        setEditableNodeId,
                        nodeId,
                        isEditable,
                        isToBeDeleted,
                        setToBeDeletedNode,
                        node,
                    }),
                    onClick: nodeOnClickHandler,
                    style: nodeStyle,
                };
            }}
        />
    );
};
