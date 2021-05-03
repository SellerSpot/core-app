import { Button, IconButton, showNotify, ToolTip } from '@sellerspot/universal-components';
import { IColors } from 'config/themes';
import React, { ReactElement } from 'react';
import { addNodeUnderParent, removeNodeAtPath, TreeItem } from 'react-sortable-tree';
import { ICONS } from 'utilities/icons';
import * as yup from 'yup';
import styles from './ModifyCategories.module.scss';
import { TGetNodeKey } from './ModifyCategories.types';

const DeleteCategoryButton = (props: {
    node: TreeItem;
    setToBeDeletedNode: React.Dispatch<React.SetStateAction<TreeItem>>;
}) => {
    const { node, setToBeDeletedNode } = props;

    return (
        <ToolTip content={'Delete Category'} enterDelay={400}>
            <div>
                <IconButton
                    icon={<ICONS.MdDelete />}
                    theme="danger"
                    size="small"
                    onClick={() => setToBeDeletedNode(node)}
                />
            </div>
        </ToolTip>
    );
};

const EditAndCancelEditButton = (props: {
    isEditable: boolean;
    editCategoryOnClickHandler: () => void;
}) => {
    const { isEditable, editCategoryOnClickHandler } = props;
    return (
        <ToolTip content={isEditable ? 'Cancel Editing' : 'Edit Category'} enterDelay={400}>
            <div>
                <IconButton
                    theme={isEditable ? 'danger' : 'primary'}
                    size="small"
                    icon={isEditable ? <ICONS.MdClear /> : <ICONS.MdModeEdit />}
                    onClick={editCategoryOnClickHandler}
                />
            </div>
        </ToolTip>
    );
};

export class ModifyCategoriesService {
    static getSortableTreeButtons = (props: {
        treeData: TreeItem[];
        path: string[];
        nodeTitle: string;
        getNodeKey: TGetNodeKey;
        nodeId: string;
        node: TreeItem;
        setSortableTreeDataState: React.Dispatch<React.SetStateAction<TreeItem[]>>;
        setEditableNodeId: React.Dispatch<React.SetStateAction<string>>;
        isToBeDeleted: boolean;
        isEditable: boolean;
        setToBeDeletedNode: React.Dispatch<React.SetStateAction<TreeItem>>;
    }): ReactElement[] => {
        const {
            treeData,
            path,
            getNodeKey,
            setSortableTreeDataState,
            setEditableNodeId,
            nodeId,
            isEditable,
            nodeTitle,
            node,
            isToBeDeleted,
            setToBeDeletedNode,
        } = props;

        const editCategoryOnClickHandler = () => {
            setEditableNodeId(isEditable ? '' : nodeId);
        };

        const addCategoryOnClickHandler = () => {
            const newTreeData = addNodeUnderParent({
                treeData: treeData,
                parentKey: path[path.length - 1],
                expandParent: true,
                getNodeKey,
                newNode: {
                    title: `New Category`,
                    id: Math.random().toString(36).substr(2, 5),
                    // setting created new flag
                    createdNew: true,
                },
                addAsFirstChild: true,
            }).treeData;
            setSortableTreeDataState(newTreeData);
        };

        const deleteCategoryOnClickHandler = () => {
            const newTreeData = removeNodeAtPath({
                treeData,
                path,
                getNodeKey,
            });
            setSortableTreeDataState(newTreeData);
            showNotify(`Deleted ${nodeTitle} category`, {
                placement: 'bottomLeft',
                theme: 'info',
                autoHideDuration: 3000,
                showNotifyAction: true,
            });
        };

        return [
            <div key={'controls'} className={styles.controls}>
                {!isToBeDeleted ? (
                    <EditAndCancelEditButton
                        editCategoryOnClickHandler={editCategoryOnClickHandler}
                        isEditable={isEditable}
                    />
                ) : null}
                {!isToBeDeleted ? (
                    <ToolTip content={'Add Category'} enterDelay={400}>
                        <div>
                            <IconButton
                                theme={'primary'}
                                size="small"
                                icon={<ICONS.MdAdd />}
                                onClick={addCategoryOnClickHandler}
                            />
                        </div>
                    </ToolTip>
                ) : null}
                {!isToBeDeleted ? (
                    <DeleteCategoryButton node={node} setToBeDeletedNode={setToBeDeletedNode} />
                ) : null}
                {isToBeDeleted ? (
                    <Button
                        label={'CANCEL'}
                        size="small"
                        theme="success"
                        variant="outlined"
                        onClick={() => setToBeDeletedNode(null)}
                    />
                ) : null}
                {isToBeDeleted ? (
                    <Button
                        label={'DELETE'}
                        size="small"
                        theme="danger"
                        variant="outlined"
                        onClick={() => deleteCategoryOnClickHandler()}
                    />
                ) : null}
            </div>,
        ];
    };

    static validateCategoryName = (title: string): string => {
        const validationSchema = yup.string().required('Category Name is required');
        try {
            validationSchema.validateSync(title);
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return error.message;
            }
        }
        return null;
    };

    static getTreeNodeStyle = (props: {
        isSelected: boolean;
        isParentNodeForSelectedNode: boolean;
        colors: IColors;
    }): React.CSSProperties => {
        const { colors, isParentNodeForSelectedNode, isSelected } = props;

        let defaultNodeStyle: React.CSSProperties = {
            borderWidth: '2px',
            borderRadius: '5px',
            borderStyle: 'solid',
            borderColor: 'transparent',
            transition: 'border-color 0.2s ease',
        };
        if (isSelected) {
            defaultNodeStyle = {
                ...defaultNodeStyle,
                borderColor: `${colors.success}`,
            };
        } else if (isParentNodeForSelectedNode) {
            defaultNodeStyle = {
                ...defaultNodeStyle,
                borderStyle: 'dashed',
                borderColor: `${colors.success}`,
            };
        }
        return defaultNodeStyle;
    };
}
