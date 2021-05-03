import { showNotify } from '@sellerspot/universal-components';
import { useModifyCategoriesStore } from 'components/Compounds/ModifyCategories/ModifyCategories';
import { ModifyCategoriesNodeDataStore } from 'components/Compounds/ModifyCategories/services/ModifyCategoriesNodeDataStore.service';
import { colorThemes } from 'config/themes';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import SortableTree, { isDescendant, TreeItem } from 'react-sortable-tree';
import { themeSelector } from 'store/models/theme';
import styles from '../../../../ModifyCategories.module.scss';
import { EditCategoryTitle } from './Components/EditCategoryTitle';
import { ModifyCategoriesNodeButtons } from './Components/ModifyCategoriesNodeButtons';

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

const customSearchMethod = (props: { node: TreeItem; searchQuery: string }) => {
    const { node, searchQuery } = props;
    return searchQuery && node.title.toString().toLowerCase().startsWith(searchQuery.toLowerCase());
};

export const SortableTreeComponent = (): ReactElement => {
    const themeState = useSelector(themeSelector);
    const modifyCategoriesStore = useModifyCategoriesStore();
    const {
        treeData,
        searchQuery,
        editableNodeId,
        toBeDeletedNode,
        selectedNode,
        setTreeData,
        setSelectedNode,
        setEditableNodeId,
    } = modifyCategoriesStore;

    return (
        <SortableTree
            rowHeight={80}
            treeData={treeData}
            searchQuery={searchQuery}
            searchMethod={customSearchMethod}
            onChange={setTreeData}
            generateNodeProps={(data) => {
                const { node } = data;
                const nodeId = node.id;
                const nodeTitle = `${node.title}`;
                const isEditable = editableNodeId === nodeId || node.createdNew;
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
                    if (event?.target?.className === 'rst__rowContents') {
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

                const switchToEditMode = () => {
                    setEditableNodeId(nodeId);
                };

                return {
                    title: isEditable ? (
                        <EditCategoryTitle nodeInstance={nodeInstance} />
                    ) : isToBeDeleted ? (
                        <DeleteConfirmTitle nodeTitle={nodeTitle} />
                    ) : (
                        <h5 onClick={switchToEditMode}>{nodeTitle}</h5>
                    ),
                    buttons: [
                        <div key={'controls'}>
                            <ModifyCategoriesNodeButtons nodeInstance={nodeInstance} />
                        </div>,
                    ],
                    onClick: nodeOnClickHandler,
                    style: nodeInstance.nodeStyle,
                };
            }}
        />
    );
};
