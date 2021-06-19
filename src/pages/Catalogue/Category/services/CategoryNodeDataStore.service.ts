import { IColors } from '@sellerspot/universal-components';
import React, { CSSProperties } from 'react';
import { ExtendedNodeData } from 'react-sortable-tree';
import { ICategoryNodeDataStoreProps } from '../Category.types';

export class CategoryNodeDataStore {
    // all sortable-tree data related to the current node
    nodeData: ExtendedNodeData;
    // if the node is in editable state
    isEditable: boolean;
    // if the node is in selected state
    isSelected: boolean;
    // if the node is a parent for the selected node
    isParentNode: boolean;
    // if the node is in the to-be-deleted state
    isToBeDeleted: boolean;
    // color information for the application
    colors: IColors;

    constructor(props: ICategoryNodeDataStoreProps) {
        const { data, colors, isToBeDeleted, isEditable, isParentNode, isSelected } = props;
        this.nodeData = data;
        this.colors = colors;
        this.isToBeDeleted = isToBeDeleted;
        this.isEditable = isEditable;
        this.isParentNode = isParentNode;
        this.isSelected = isSelected;
    }

    getNodeStyle = (): CSSProperties => {
        let defaultNodeStyle: React.CSSProperties = {
            borderWidth: '2px',
            borderRadius: '5px',
            borderStyle: 'solid',
            cursor: 'default',
            borderColor: 'transparent',
            transition: 'border-color 0.2s ease',
        };
        if (this.isSelected) {
            defaultNodeStyle = {
                ...defaultNodeStyle,
                borderColor: `${this.colors.success}`,
            };
        } else if (this.isParentNode) {
            defaultNodeStyle = {
                ...defaultNodeStyle,
                borderStyle: 'dashed',
                borderColor: `${this.colors.success}`,
            };
        }
        return defaultNodeStyle;
    };
}
