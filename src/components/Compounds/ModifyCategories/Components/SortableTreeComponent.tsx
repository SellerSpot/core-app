import { ClickAwayListener } from '@material-ui/core';
import { IconButton, InputField, Popper } from '@sellerspot/universal-components';
import { colorThemes } from 'config/themes';
import React, { ReactElement, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import SortableTree, { changeNodeAtPath, isDescendant, TreeItem } from 'react-sortable-tree';
import { themeSelector } from 'store/models/theme';
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
    type TOpenPopperHandler = (props: { anchorEl: HTMLElement }) => void;
    type IInputFieldOnChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

    const {
        nodeTitle,
        setSortableTreeDataState,
        sortableTreeDataState,
        path,
        node,
        setEditableNodeId,
    } = props;
    // used to hold reference to invoke when the field is submitted
    const inputElementRef = useRef<HTMLElement>(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [nodeTitleState, setNodeTitleState] = useState(nodeTitle);

    const titleOnChangeHandler = (event: TTitleInputFieldEvent) => {
        const title = event.target.value;
        setNodeTitleState(title);
    };

    const pushTitleToTreeState = (props: { openPopperHandler?: TOpenPopperHandler }) => {
        const { openPopperHandler } = props;
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
            setErrorMessage(validationResult);
            openPopperHandler({ anchorEl: inputElementRef.current });
        }
    };

    const SuffixButton = (props: { openPopperHandler: TOpenPopperHandler }) => {
        const { openPopperHandler } = props;
        return (
            <IconButton
                theme={'success'}
                size="small"
                icon={<ICONS.MdCheck />}
                onClick={() => pushTitleToTreeState({ openPopperHandler })}
            />
        );
    };

    return (
        <Popper
            popperContent={({}) => (
                <div className={styles.categoryNameErrorWrapper}>
                    <h6>{errorMessage}</h6>
                </div>
            )}
        >
            {({ closePopperHandler, openPopperHandler }) => {
                const handleOnKeyDown = (key: React.KeyboardEvent<HTMLDivElement>) => {
                    if (key.code === 'Enter') {
                        pushTitleToTreeState({ openPopperHandler });
                    }
                };
                const handleOnChange = (event: IInputFieldOnChangeEvent) => {
                    closePopperHandler();
                    titleOnChangeHandler(event);
                };

                return (
                    <ClickAwayListener onClickAway={() => setEditableNodeId('')}>
                        <div
                            ref={inputElementRef as React.LegacyRef<HTMLDivElement>}
                            className={styles.categoryNameField}
                        >
                            <InputField
                                size="small"
                                disableHelperTextPlaceholderPadding
                                theme="primary"
                                fullWidth
                                selectTextOnFocus
                                autoFocus
                                value={nodeTitleState}
                                onChange={handleOnChange}
                                onKeyDown={handleOnKeyDown}
                                suffix={<SuffixButton openPopperHandler={openPopperHandler} />}
                            />
                        </div>
                    </ClickAwayListener>
                );
            }}
        </Popper>
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

                const switchToEditMode = () => {
                    setEditableNodeId(nodeId);
                };

                const nodeStyle = ModifyCategoriesService.getTreeNodeStyle({
                    colors: colorThemes[themeState.colorTheme],
                    isParentNodeForSelectedNode,
                    isSelected,
                });

                // 'any' because no typing is provided for the onClick event in react-sortable-tree
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const nodeOnClickHandler = (event: any) => {
                    if (
                        !event.target.className.includes('collapseButton') &&
                        !event.target.className.includes('expandButton')
                    ) {
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
                            setSortableTreeDataState={setSortableTreeDataState}
                            sortableTreeDataState={sortableTreeDataState}
                            node={node}
                            setEditableNodeId={setEditableNodeId}
                        />
                    ) : (
                        <h5 onClick={switchToEditMode}>{nodeTitle}</h5>
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
                    onClick: nodeOnClickHandler,
                    style: nodeStyle,
                };
            }}
        />
    );
};
