import { useState } from '@hookstate/core';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { CSSProperties } from 'react';
import { TreeItem } from 'react-sortable-tree';
import { rawClone } from 'utilities/general';
import { CategoryView as CategoryViewComponent, ICategoryViewProps } from './CategoryView';

interface IComponentStateProps {
    treeData: TreeItem[];
    selectedNode: TreeItem;
}

const Template: Story<ICategoryViewProps> = () => {
    // styles
    const storybookWrapperStyle: CSSProperties = {
        height: '100vh',
        width: '100vw',
    };

    const componentState = useState<IComponentStateProps>({
        treeData: [
            {
                id: 'redbull',
                title: 'Red Bull',
                children: [
                    {
                        id: 'alpine1',
                        title: 'Alpine',
                    },
                ],
            },
            {
                id: 'mclaren',
                title: 'McLaren',
            },
            {
                id: 'alpine',
                title: 'Alpine',
            },
        ],
        selectedNode: null,
    });

    // handlers
    const onChangeHandler: ICategoryViewProps['onChangeCallback'] = (treedata) => {
        componentState.treeData.set(treedata);
    };
    const onSelectNodeHandler: ICategoryViewProps['onSelectNodeCallback'] = (node) => () => {
        if (componentState.selectedNode.get()?.id === node.id) {
            componentState.selectedNode.set(null);
        } else {
            componentState.selectedNode.set(node);
        }
    };
    const canDropHandler: ICategoryViewProps['canDrop'] = (props) => {
        // props
        const { node, nextParent } = props;

        // variables
        const nextSiblings = nextParent?.children as TreeItem[];

        if (!!nextSiblings) {
            const doesHaveSiblingWithSameName = nextSiblings.some(
                (sibling) => sibling.id !== node.id && sibling.title === node.title,
            );
            if (doesHaveSiblingWithSameName) {
                return false;
            }
        }
        return true;
    };

    // args
    const componentArgs: ICategoryViewProps = {
        treeData: rawClone(componentState.treeData.get()),
        selectedNode: rawClone(componentState.selectedNode.get()),
        isLoading: false,
        searchQuery: '',
        createCategoryCallback: () => void 0,
        deleteCategoryCallback: () => void 0,
        editCategoryCallback: () => void 0,
        onMoveNode: () => void 0,
        onChangeCallback: onChangeHandler,
        canDrop: canDropHandler,
        onSelectNodeCallback: onSelectNodeHandler,
    };

    // return
    return (
        <div style={storybookWrapperStyle}>
            <CategoryViewComponent {...componentArgs} />
        </div>
    );
};

export const CategoryView = Template.bind({});

export default {
    title: 'Core App/Compounds/Category View',
    component: CategoryViewComponent,
} as Meta;
