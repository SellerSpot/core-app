import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import {
    Button,
    IconButton,
    IIconButtonProps,
    showNotify,
    ToolTip,
} from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { removeNodeAtPath } from 'react-sortable-tree';
import { ICONS } from 'utilities/utilities';
import styles from '../../../../../Categories.module.scss';
import { IUseCategoriesStore } from '../../../../../Categories.types';
import { CategoriesNodeDataStore } from '../../../../../services/CategoriesNodeDataStore.service';

const getNodeKey = ({ treeIndex }: { treeIndex: number }) => treeIndex;

const EditCategoryButton = (props: {
    nodeInstance: CategoriesNodeDataStore;
    pageState: State<IUseCategoriesStore>;
}) => {
    const { nodeInstance, pageState } = props;
    const { editableNodeDetails } = useState(pageState);
    // fetching data from node class instance
    const {
        isEditable,
        nodeData: { node, path },
    } = nodeInstance;
    const toolTipContent = 'Edit Category';
    const theme: IIconButtonProps['theme'] = 'primary';
    const icon: IIconButtonProps['icon'] = <Icon icon={ICONS.baselineEdit} />;

    const onClickHandler = () => {
        editableNodeDetails.set(
            isEditable
                ? null
                : {
                      node,
                      path: path as string[],
                  },
        );
    };

    return (
        <ToolTip content={toolTipContent} enterDelay={400}>
            <div>
                <IconButton theme={theme} size="small" icon={icon} onClick={onClickHandler} />
            </div>
        </ToolTip>
    );
};

const AddCategoryButton = (props: {
    nodeInstance: CategoriesNodeDataStore;
    pageState: State<IUseCategoriesStore>;
}) => {
    const { nodeInstance, pageState } = props;
    const { toBeAddedNodeDetails } = useState(pageState);
    // fetching data from node class instance
    const {
        nodeData: { path },
    } = nodeInstance;

    const onClickHandler = () => {
        // virtual since the node is not yet present in the actual tree
        const virtualPathForNewNode = [...(path as string[]), '-1'];
        toBeAddedNodeDetails.set({
            node: {
                title: 'New Category',
            },
            path: virtualPathForNewNode,
        });
    };

    return (
        <ToolTip content={'Add Category'} enterDelay={400}>
            <div>
                <IconButton
                    theme={'primary'}
                    size="small"
                    icon={<Icon icon={ICONS.outlineAdd} />}
                    onClick={onClickHandler}
                />
            </div>
        </ToolTip>
    );
};

const DeleteCategoryButton = (props: {
    nodeInstance: CategoriesNodeDataStore;
    pageState: State<IUseCategoriesStore>;
}) => {
    const { nodeInstance, pageState } = props;
    const { toBeDeletedNode } = useState(pageState);
    // fetching data from node class instance
    const {
        nodeData: { node },
    } = nodeInstance;
    const onClickHandler = () => {
        toBeDeletedNode.set(node);
    };

    return (
        <ToolTip content={'Delete Category'} enterDelay={400}>
            <div>
                <IconButton
                    icon={<Icon icon={ICONS.outlineDeleteOutline} />}
                    theme="danger"
                    size="small"
                    onClick={onClickHandler}
                />
            </div>
        </ToolTip>
    );
};

const CancelDeleteConfirmation = (props: { pageState: State<IUseCategoriesStore> }) => {
    const { pageState } = props;
    const { toBeDeletedNode } = useState(pageState);
    const onClickHandler = () => {
        toBeDeletedNode.set(null);
    };
    return (
        <Button
            label={'CANCEL'}
            size="small"
            theme="success"
            variant="outlined"
            onClick={onClickHandler}
        />
    );
};

const ProceedDeleteConfirmation = (props: {
    nodeInstance: CategoriesNodeDataStore;
    pageState: State<IUseCategoriesStore>;
}) => {
    const { nodeInstance, pageState } = props;
    const { treeData } = useState(pageState);
    // fetching data from node class instance
    const {
        nodeData: {
            path,
            node: { title },
        },
    } = nodeInstance;
    const onClickHandler = () => {
        const newTreeData = removeNodeAtPath({
            treeData: treeData.get(),
            path,
            getNodeKey,
        });
        treeData.set(newTreeData);
        showNotify(`Deleted ${title} category`, {
            placement: 'bottomLeft',
            theme: 'info',
            autoHideDuration: 3000,
            showNotifyAction: true,
        });
    };
    return (
        <Button
            label={'DELETE'}
            size="small"
            theme="danger"
            variant="outlined"
            onClick={onClickHandler}
        />
    );
};

export const CategoriesNodeButtons = (props: {
    nodeInstance: CategoriesNodeDataStore;
    pageState: State<IUseCategoriesStore>;
}): ReactElement => {
    const { nodeInstance, pageState } = props;
    const state = useState(pageState);

    // fetching data from node class instance
    const { isToBeDeleted } = nodeInstance;

    return (
        <div className={styles.controls}>
            {!isToBeDeleted ? (
                <EditCategoryButton nodeInstance={nodeInstance} pageState={state} />
            ) : null}
            {!isToBeDeleted ? (
                <AddCategoryButton nodeInstance={nodeInstance} pageState={state} />
            ) : null}
            {!isToBeDeleted ? (
                <DeleteCategoryButton nodeInstance={nodeInstance} pageState={state} />
            ) : null}
            {isToBeDeleted ? <CancelDeleteConfirmation pageState={state} /> : null}
            {isToBeDeleted ? (
                <ProceedDeleteConfirmation nodeInstance={nodeInstance} pageState={state} />
            ) : null}
        </div>
    );
};
