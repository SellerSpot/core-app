import { IconButton, InputField, Popper } from '@sellerspot/universal-components';
import React, { ReactElement, useRef, useState } from 'react';
import { changeNodeAtPath, TreeItem } from 'react-sortable-tree';
import { ICONS } from 'utilities/icons';
import { ModifyCategoriesService } from '../ModifyCategories.service';
import styles from '../ModifyCategories.module.scss';
import {
    TGetNodeKey,
    TSetSortableTreeDataState,
    TTitleInputFieldEvent,
} from '../ModifyCategories.types';
import { ClickAwayListener } from '@material-ui/core';

const getPopperContent = (props: { errorMessage: string }) => {
    const { errorMessage } = props;
    return (
        <div className={styles.categoryNameErrorWrapper}>
            <h6>{errorMessage}</h6>
        </div>
    );
};

export const EditCategoryTitle = (props: {
    nodeTitle: string;
    setSortableTreeDataState: TSetSortableTreeDataState;
    sortableTreeDataState: TreeItem[];
    path: string[];
    node: TreeItem;
    getNodeKey: TGetNodeKey;
    setEditableNodeId: React.Dispatch<React.SetStateAction<string>>;
}): ReactElement => {
    const {
        nodeTitle,
        setSortableTreeDataState,
        sortableTreeDataState,
        path,
        node,
        getNodeKey,
        setEditableNodeId,
    } = props;

    // common types
    type TOpenPopperHandler = (props: { anchorEl: HTMLElement }) => void;
    type IInputFieldOnChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

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

    const popperContent = () => {
        return getPopperContent({ errorMessage });
    };

    return (
        <Popper popperContent={popperContent}>
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
