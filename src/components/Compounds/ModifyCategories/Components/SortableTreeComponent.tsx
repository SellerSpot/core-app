import { IconButton, InputField, showNotify } from '@sellerspot/universal-components';
import React, { ReactElement, useState } from 'react';
import SortableTree, { changeNodeAtPath, TreeItem } from 'react-sortable-tree';
import { ICONS } from 'utilities/icons';
import styles from '../ModifyCategories.module.scss';
import { ModifyCategoriesService } from '../ModifyCategories.service';
import { TSetSortableTreeDataState, TTitleInputFieldEvent } from '../ModifyCategories.types';

const getNodeKey = ({ treeIndex }: { treeIndex: number }) => treeIndex;

const EditCategoryTitle = (props: {
    nodeTitle: string;
    setSortableTreeDataState: TSetSortableTreeDataState;
    sortableTreeDataState: TreeItem[];
    path: string[];
    node: TreeItem;
    setEditableNodeId: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const {
        nodeTitle,
        setSortableTreeDataState,
        sortableTreeDataState,
        path,
        node,
        setEditableNodeId,
    } = props;
    const [nodeTitleState, setNodeTitleState] = useState(nodeTitle);

    const titleOnChangeHandler = (event: TTitleInputFieldEvent) => {
        const title = event.target.value;
        setNodeTitleState(title);
    };

    const pushTitleToTreeState = () => {
        const validationResult = ModifyCategoriesService.validateCategoryName(nodeTitleState);

        if (!validationResult) {
            const newTreeData = changeNodeAtPath({
                treeData: sortableTreeDataState,
                getNodeKey,
                path,
                newNode: {
                    ...node,
                    title: nodeTitleState,
                    createdNew: false,
                },
            });
            setSortableTreeDataState(newTreeData);
            setEditableNodeId('');
        } else {
            showNotify(validationResult, {
                closeOnClickAway: true,
                theme: 'error',
                placement: 'bottomLeft',
                autoHideDuration: -1,
            });
        }
    };

    const SuffixButton = () => {
        return (
            <IconButton
                theme={'success'}
                size="small"
                icon={<ICONS.MdCheck />}
                onClick={pushTitleToTreeState}
            />
        );
    };

    return (
        <div className={styles.categoryNameField}>
            <InputField
                size="small"
                disableHelperTextPlaceholderPadding
                theme="primary"
                selectTextOnFocus
                autoFocus
                value={nodeTitleState}
                onChange={titleOnChangeHandler}
                onKeyDown={(key) => {
                    if (key.code === 'Enter') {
                        pushTitleToTreeState();
                    }
                }}
                suffix={<SuffixButton />}
            />
        </div>
    );
};

export const SortableTreeComponent = (props: {
    sortableTreeDataState: TreeItem[];
    searchQuery: string;
    setSortableTreeDataState: TSetSortableTreeDataState;
}): ReactElement => {
    const { sortableTreeDataState, searchQuery, setSortableTreeDataState } = props;
    // holds the id of the node that can be edited
    const [editableNodeId, setEditableNodeId] = useState<string>(null);

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

                const activateEditMode = () => {
                    setEditableNodeId(nodeId);
                };

                return {
                    title: isEditable ? (
                        <EditCategoryTitle
                            nodeTitle={nodeTitle}
                            path={path as string[]}
                            setSortableTreeDataState={setSortableTreeDataState}
                            sortableTreeDataState={sortableTreeDataState}
                            node={node}
                            setEditableNodeId={setEditableNodeId}
                        />
                    ) : (
                        <h5 onClick={activateEditMode}>{nodeTitle}</h5>
                    ),
                    buttons: ModifyCategoriesService.getSortableTreeButtons({
                        getNodeKey,
                        path: path as string[],
                        treeData: sortableTreeDataState,
                        setSortableTreeDataState,
                        setEditableNodeId,
                        nodeId,
                        isEditable,
                    }),
                };
            }}
        />
    );
};
