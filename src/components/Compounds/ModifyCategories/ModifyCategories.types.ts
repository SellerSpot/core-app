import { IColors } from 'config/themes';
import { ExtendedNodeData, TreeItem } from 'react-sortable-tree';

interface ICategory {
    id: string;
    title: string;
    /**
     * Used to help identified newly created nodes
     */
    createdNew?: boolean;
    children: ICategory[];
}

export interface IModifyCategoriesProps {
    categoriesData: ICategory[];
}

export type TUseModifyCategoriesStore = {
    // data
    treeData: TreeItem[];
    searchQuery: string;
    editableNodeId: string;
    selectedNode: TreeItem;
    toBeDeletedNode: TreeItem;
    // functions
    setTreeData: (treeData: TreeItem[]) => void;
    setSearchQuery: (searchQuery: string) => void;
    setEditableNodeId: (editableNodeId: string) => void;
    setSelectedNode: (selectedNode: TreeItem) => void;
    setToBeDeletedNode: (toBeDeletedNode: TreeItem) => void;
};

export type TOpenPopperHandler = (props: { anchorEl: HTMLElement }) => void;
export type IInputFieldOnChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export interface IModifyCategoriesNodeDataStoreProps {
    data: ExtendedNodeData;
    isEditable: boolean;
    isSelected: boolean;
    isParentNode: boolean;
    isToBeDeleted: boolean;
    colors: IColors;
}

export type TSetSortableTreeDataState = React.Dispatch<React.SetStateAction<TreeItem[]>>;
export type TTitleInputFieldEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type TGetNodeKey = ({ treeIndex }: { treeIndex: number }) => number;
