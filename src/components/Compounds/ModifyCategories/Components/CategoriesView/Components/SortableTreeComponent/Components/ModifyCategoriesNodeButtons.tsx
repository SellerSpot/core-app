import {
    Button,
    IconButton,
    IIconButtonProps,
    showNotify,
    ToolTip,
} from '@sellerspot/universal-components';
import { useModifyCategoriesStore } from 'components/Compounds/ModifyCategories/ModifyCategories';
import { ModifyCategoriesNodeDataStore } from 'components/Compounds/ModifyCategories/services/ModifyCategoriesNodeDataStore.service';
import React, { ReactElement } from 'react';
import { removeNodeAtPath } from 'react-sortable-tree';
import { ICONS } from 'utilities/icons';
import styles from '../../../../../ModifyCategories.module.scss';

const getNodeKey = ({ treeIndex }: { treeIndex: number }) => treeIndex;

const EditAndCancelEditButton = (props: { nodeInstance: ModifyCategoriesNodeDataStore }) => {
    const { nodeInstance } = props;
    // fetching data from node class instance
    const {
        isEditable,
        nodeData: { node, path },
    } = nodeInstance;
    // fetching data from store
    const setEditableNodeDetails = useModifyCategoriesStore(
        (state) => state.setEditableNodeDetails,
    );
    const toolTipContent = isEditable ? 'Cancel Editing' : 'Edit Category';
    const theme: IIconButtonProps['theme'] = isEditable ? 'danger' : 'primary';
    const icon: IIconButtonProps['icon'] = isEditable ? <ICONS.MdClear /> : <ICONS.MdModeEdit />;

    const onClickHandler = () => {
        setEditableNodeDetails(
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

const AddCategoryButton = (props: { nodeInstance: ModifyCategoriesNodeDataStore }) => {
    const { nodeInstance } = props;
    // fetching data from node class instance
    const {
        nodeData: { path },
    } = nodeInstance;
    // fetching data from store
    const setToBeAddedNodeDetails = useModifyCategoriesStore(
        (state) => state.setToBeAddedNodeDetails,
    );

    const onClickHandler = () => {
        // virtual since the node is not yet present in the actual tree
        const virtualPathForNewNode = [...(path as string[]), '-1'];
        setToBeAddedNodeDetails({
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
                    icon={<ICONS.MdAdd />}
                    onClick={onClickHandler}
                />
            </div>
        </ToolTip>
    );
};

const DeleteCategoryButton = (props: { nodeInstance: ModifyCategoriesNodeDataStore }) => {
    const { nodeInstance } = props;
    // fetching data from node class instance
    const {
        nodeData: { node },
    } = nodeInstance;
    // fetching data from store
    const setToBeDeletedNode = useModifyCategoriesStore((state) => state.setToBeDeletedNode);
    const onClickHandler = () => {
        setToBeDeletedNode(node);
    };

    return (
        <ToolTip content={'Delete Category'} enterDelay={400}>
            <div>
                <IconButton
                    icon={<ICONS.MdDelete />}
                    theme="danger"
                    size="small"
                    onClick={onClickHandler}
                />
            </div>
        </ToolTip>
    );
};

const CancelDeleteConfirmation = () => {
    const setToBeDeletedNode = useModifyCategoriesStore((state) => state.setToBeDeletedNode);
    const onClickHandler = () => {
        setToBeDeletedNode(null);
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

const ProceedDeleteConfirmation = (props: { nodeInstance: ModifyCategoriesNodeDataStore }) => {
    const { nodeInstance } = props;
    // fetching data from node class instance
    const {
        nodeData: {
            path,
            node: { title },
        },
    } = nodeInstance;
    // fetching data from store
    const setTreeData = useModifyCategoriesStore((state) => state.setTreeData);
    const treeData = useModifyCategoriesStore((state) => state.treeData);
    const onClickHandler = () => {
        const newTreeData = removeNodeAtPath({
            treeData,
            path,
            getNodeKey,
        });
        setTreeData(newTreeData);
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

export const ModifyCategoriesNodeButtons = (props: {
    nodeInstance: ModifyCategoriesNodeDataStore;
}): ReactElement => {
    const { nodeInstance } = props;

    // fetching data from node class instance
    const { isToBeDeleted } = nodeInstance;

    return (
        <div className={styles.controls}>
            {!isToBeDeleted ? <EditAndCancelEditButton nodeInstance={nodeInstance} /> : null}
            {!isToBeDeleted ? <AddCategoryButton nodeInstance={nodeInstance} /> : null}
            {!isToBeDeleted ? <DeleteCategoryButton nodeInstance={nodeInstance} /> : null}
            {isToBeDeleted ? <CancelDeleteConfirmation /> : null}
            {isToBeDeleted ? <ProceedDeleteConfirmation nodeInstance={nodeInstance} /> : null}
        </div>
    );
};
