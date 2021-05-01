import { IconButton, ToolTip } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { addNodeUnderParent, removeNodeAtPath, TreeItem } from 'react-sortable-tree';
import { ICONS } from 'utilities/icons';
import * as yup from 'yup';
import styles from './ModifyCategories.module.scss';

export class ModifyCategoriesService {
    static getSortableTreeButtons = (props: {
        treeData: TreeItem[];
        path: string[];
        getNodeKey: ({ treeIndex }: { treeIndex: number }) => number;
        nodeId: string;
        setSortableTreeDataState: React.Dispatch<React.SetStateAction<TreeItem[]>>;
        setEditableNodeId: React.Dispatch<React.SetStateAction<string>>;
        isEditable: boolean;
    }): ReactElement[] => {
        const {
            treeData,
            path,
            getNodeKey,
            setSortableTreeDataState,
            setEditableNodeId,
            nodeId,
            isEditable,
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
        };

        return [
            <div key={'controls'} className={styles.controls}>
                <ToolTip content={isEditable ? 'Cancel Editing' : 'Edit Category'}>
                    <div>
                        <IconButton
                            theme={isEditable ? 'danger' : 'primary'}
                            size="small"
                            icon={isEditable ? <ICONS.MdClear /> : <ICONS.MdModeEdit />}
                            onClick={editCategoryOnClickHandler}
                        />
                    </div>
                </ToolTip>
                <ToolTip content={'Add Category'}>
                    <div>
                        <IconButton
                            theme={'primary'}
                            size="small"
                            icon={<ICONS.MdAdd />}
                            onClick={addCategoryOnClickHandler}
                        />
                    </div>
                </ToolTip>
                <ToolTip content={'Delete Category'}>
                    <div>
                        <IconButton
                            icon={<ICONS.MdDelete />}
                            theme="danger"
                            size="small"
                            onClick={deleteCategoryOnClickHandler}
                        />
                    </div>
                </ToolTip>
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

    // static showDeleteCategoryConfirmation = () => {
    //     showDialog({
    //         content: <h6>{'This action will delete the category from listing'}</h6>,
    //         fullWidth: true,
    //         disableBackdropClick: true,
    //     });
    // };
}
