import { ClickAwayListener } from '@material-ui/core';
import { IconButton, InputField, Popper } from '@sellerspot/universal-components';
import { useModifyCategoriesStore } from 'components/Compounds/ModifyCategories/ModifyCategories';
import {
    IInputFieldOnChangeEvent,
    TOpenPopperHandler,
    TTitleInputFieldEvent,
} from 'components/Compounds/ModifyCategories/ModifyCategories.types';
import { ModifyCategoriesNodeDataStore } from 'components/Compounds/ModifyCategories/services/ModifyCategoriesNodeDataStore.service';
import React, { ReactElement, useRef, useState } from 'react';
import { changeNodeAtPath } from 'react-sortable-tree';
import { ICONS } from 'utilities/icons';
import { ModifyCategoriesService } from '../../../../../services/ModifyCategories.service';

import styles from '../ModifyCategories.module.scss';

const getNodeKey = ({ treeIndex }: { treeIndex: number }) => treeIndex;

const getPopperContent = (props: { errorMessage: string }) => {
    const { errorMessage } = props;
    return (
        <div className={styles.categoryNameErrorWrapper}>
            <h6>{errorMessage}</h6>
        </div>
    );
};

export const EditCategoryTitle = (props: {
    nodeInstance: ModifyCategoriesNodeDataStore;
}): ReactElement => {
    const { nodeInstance } = props;

    // fetching data from node class instance
    const {
        nodeData: { node, path },
    } = nodeInstance;
    const { title } = node;

    // fetching values from store
    const modifyCategoriesStore = useModifyCategoriesStore();
    const { treeData, setTreeData, setEditableNodeId } = modifyCategoriesStore;

    // used to hold reference to invoke when the field is submitted
    const inputElementRef = useRef<HTMLElement>(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [nodeTitleState, setNodeTitleState] = useState(`${title}`);

    const titleOnChangeHandler = (event: TTitleInputFieldEvent) => {
        const title = event.target.value;
        setNodeTitleState(title);
    };

    const pushTitleToTreeState = (props: { openPopperHandler?: TOpenPopperHandler }) => {
        const { openPopperHandler } = props;
        const validationResult = ModifyCategoriesService.validateCategoryName(nodeTitleState);

        if (!validationResult) {
            const newTreeData = changeNodeAtPath({
                treeData,
                getNodeKey,
                path,
                newNode: {
                    ...node,
                    title: nodeTitleState,
                    createdNew: false,
                },
            });
            setTreeData(newTreeData);
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
