import { useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { IconButton, IIconButtonProps, ToolTip } from '@sellerspot/universal-components';
import { intersection } from 'lodash';
import React, { CSSProperties, ReactElement, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import SortableTree, { ReactSortableTreeProps } from 'react-sortable-tree';
import { themeSelector } from 'store/models/theme';
import { ICONS } from 'utilities/utilities';
import styles from './CategoryView.module.scss';
import { CategoryViewService } from './CategoryView.service';
import { ICategoryViewProps } from './CategoryView.types';
import { CategoryViewLoadingSkeleton } from './Components/CategoryViewLoadingSkeleton/CategoryViewLoadingSkeleton';

export { ICategoryViewProps } from './CategoryView.types';

export const CategoryView = (props: ICategoryViewProps): ReactElement => {
    // props
    const {
        treeData,
        selectedNode,
        searchQuery,
        isLoading,
        canDragNodes,
        onMoveNode,
        canDrop,
        createCategoryCallback,
        editCategoryCallback,
        onChangeCallback,
        onSelectNodeCallback,
        deleteCategoryCallback,
    } = props;

    // variables
    const wrapperHeight = useState(100);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // theme state
    const { colorTheme } = useSelector(themeSelector);

    // styles
    const wrapperStyle: CSSProperties = {
        height: `${wrapperHeight.get()}px`,
    };

    // helper function
    const generateNodeProps: ReactSortableTreeProps['generateNodeProps'] = (props) => {
        // props
        const { node } = props;

        // compiling data
        const nodeTitle = node?.title;
        const isSelected = selectedNode?.id === node.id;
        const isParentNode = CategoryViewService.isNodeParent({
            currentNode: node,
            selectedNode,
        });

        // buttons
        const CreateCategoryButton = () => {
            // handlers
            const onClickHandler: IIconButtonProps['onClick'] = (event) => {
                event.stopPropagation();
                createCategoryCallback(node);
            };

            // draw
            return (
                <ToolTip content="Add Category" enterDelay={400}>
                    <div>
                        <IconButton
                            icon={<Icon icon={ICONS.outlineAdd} />}
                            theme="primary"
                            size="small"
                            onClick={onClickHandler}
                        />
                    </div>
                </ToolTip>
            );
        };
        const EditCategoryButton = () => {
            // handlers
            const onClickHandler: IIconButtonProps['onClick'] = (event) => {
                event.stopPropagation();
                editCategoryCallback(node);
            };

            // draw
            return (
                <ToolTip content="Edit Category" enterDelay={400}>
                    <div>
                        <IconButton
                            icon={<Icon icon={ICONS.baselineEdit} />}
                            theme="primary"
                            size="small"
                            onClick={onClickHandler}
                        />
                    </div>
                </ToolTip>
            );
        };
        const DeleteCategoryButton = () => {
            // handlers
            const onClickHandler: IIconButtonProps['onClick'] = (event) => {
                event.stopPropagation();
                deleteCategoryCallback(node);
            };

            // draw
            return (
                <ToolTip content="Delete Category" enterDelay={400}>
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

        // handlers
        // 'any' because no typing is provided for the onClick event in react-sortable-tree
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const onClickNodeHandler = (event: any) => {
            // making sure the click is from the node and not the + icon
            const eventClass: string = event?.target?.className;

            // clicks that should be recognized
            const whitelistedTouchTargets = [
                'rst__rowContents',
                'nodeTitle',
                'rst__rowLabel',
                'rst__rowContentsDragDisabled',
            ];
            const shouldInvokeCallback =
                intersection(whitelistedTouchTargets, eventClass.split(' ')).length > 0;
            if (shouldInvokeCallback) {
                onSelectNodeCallback?.(node)(event);
            }
        };

        // draw
        return {
            title: <h5 className="nodeTitle">{nodeTitle}</h5>,
            onClick: onClickNodeHandler,
            buttons: [
                canDragNodes && (
                    <div key="buttons" className={styles.controls}>
                        <CreateCategoryButton />
                        <EditCategoryButton />
                        <DeleteCategoryButton />
                    </div>
                ),
            ],
            style: CategoryViewService.getNodeStyle({
                colorTheme,
                isParentNode,
                isSelected,
            }),
        };
    };

    // compiling component props
    const sortableTreeProps: ReactSortableTreeProps = {
        searchQuery,
        rowHeight: 80,
        treeData: treeData,
        canDrag: canDragNodes,
        // will get error is virtualization is switched on (component bug)
        isVirtualized: false,
        canDrop,
        onMoveNode,
        generateNodeProps,
        onChange: onChangeCallback,
    };

    // effects
    useEffect(() => {
        // setting client height to wrapper (for sortable tree to compute height)
        const clientHeight = wrapperRef.current?.clientHeight;
        clientHeight && wrapperHeight.set(clientHeight);
    }, [wrapperRef]);

    // return
    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <div className={styles.treeWrapper} style={wrapperStyle}>
                {isLoading ? (
                    <CategoryViewLoadingSkeleton />
                ) : (
                    <SortableTree {...sortableTreeProps} />
                )}
            </div>
        </div>
    );
};
