import { CSSProperties } from 'react';
import { TreeItem } from 'react-sortable-tree';
import { colorThemes, IColorThemes } from '../../../../.yalc/@sellerspot/universal-components/dist';

interface IGetNodeStyleProps {
    colorTheme: keyof IColorThemes;
    isSelected: boolean;
    isParentNode: boolean;
}

interface IIsNodeParent {
    currentNode: TreeItem;
    selectedNode: TreeItem;
}

export class CategoryViewService {
    static isNodeParent = (props: IIsNodeParent): boolean => {
        // props
        const { currentNode, selectedNode } = props;

        // varaiables
        const childrenOfNode: TreeItem[] = currentNode?.children as TreeItem[];

        // compute
        if (!!selectedNode) {
            return childrenOfNode?.some((child) => {
                return (
                    child?.id === selectedNode?.id ||
                    CategoryViewService.isNodeParent({
                        currentNode: child,
                        selectedNode: selectedNode,
                    })
                );
            });
        } else {
            return false;
        }
    };
    static getNodeStyle = (props: IGetNodeStyleProps): CSSProperties => {
        // props
        const { colorTheme, isParentNode, isSelected } = props;

        // setting style
        let defaultNodeStyle: React.CSSProperties = {
            borderWidth: '2px',
            borderRadius: '5px',
            borderStyle: 'solid',
            cursor: 'default',
            borderColor: 'transparent',
        };
        if (isSelected) {
            defaultNodeStyle = {
                ...defaultNodeStyle,
                borderColor: `${colorThemes[colorTheme].success}`,
            };
        } else if (isParentNode) {
            defaultNodeStyle = {
                ...defaultNodeStyle,
                borderStyle: 'dashed',
                borderColor: `${colorThemes[colorTheme].success}`,
            };
        }
        return defaultNodeStyle;
    };
}
