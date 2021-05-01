import { IconButton, ToolTip } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { addNodeUnderParent, removeNodeAtPath, TreeItem } from 'react-sortable-tree';
import styles from './ModifyCategories.module.scss';
import { ICONS } from 'utilities/icons';

export class ModifyCategoriesService {
    static getSortableTreeButtons = (props: {
        treeData: TreeItem[];
        path: number[] | string[];
        getNodeKey: ({ treeIndex }: { treeIndex: number }) => number;
        setSortableTreeDataState: React.Dispatch<React.SetStateAction<TreeItem[]>>;
    }): ReactElement[] => {
        const { treeData, path, getNodeKey, setSortableTreeDataState } = props;
        return [
            <div key={'controls'} className={styles.controls}>
                <ToolTip content={'Add Category'}>
                    <div>
                        <IconButton
                            theme={'primary'}
                            size="small"
                            icon={<ICONS.MdAdd />}
                            onClick={() => {
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
                            }}
                        />
                    </div>
                </ToolTip>
                <ToolTip content={'Delete Category'}>
                    <div>
                        <IconButton
                            icon={<ICONS.MdDelete />}
                            theme="danger"
                            size="small"
                            onClick={() => {
                                const newTreeData = removeNodeAtPath({
                                    treeData,
                                    path,
                                    getNodeKey,
                                });
                                setSortableTreeDataState(newTreeData);
                            }}
                        />
                    </div>
                </ToolTip>
            </div>,
        ];
    };
}
