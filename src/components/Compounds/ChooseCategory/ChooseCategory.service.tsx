import { IconButton, ToolTip } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { addNodeUnderParent, removeNodeAtPath, TreeItem } from 'react-sortable-tree';
import styles from './ChooseCategory.module.scss';
import { ICONS } from 'utilities/icons';

export class ChooseCategoryService {
    static getSortableTreeButtons = (props: {
        treeData: TreeItem[];
        path: number[] | string[];
        getNodeKey: ({ treeIndex }: { treeIndex: number }) => number;
        setSortableTreeDataState: React.Dispatch<React.SetStateAction<TreeItem[]>>;
    }): ReactElement[] => {
        const { treeData, path, getNodeKey, setSortableTreeDataState } = props;

        const addCategoryOnClickHandler = () => {
            const newTreeData = addNodeUnderParent({
                treeData: treeData,
                parentKey: path[path.length - 1],
                expandParent: true,
                getNodeKey,
                newNode: {
                    title: `New Category`,
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
}
