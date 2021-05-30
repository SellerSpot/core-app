import { IColors } from '@sellerspot/universal-components';
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

type TEditableNodeDetails = {
    node: TreeItem;
    path: string[];
};

export type TUseModifyCategoriesStore = {
    // data
    treeData: TreeItem[];
    searchQuery: string;
    editableNodeDetails: TEditableNodeDetails;
    selectedNode: TreeItem;
    toBeDeletedNode: TreeItem;
    toBeAddedNodeDetails: TEditableNodeDetails;
    // functions
    setTreeData: (treeData: TreeItem[]) => void;
    setSearchQuery: (searchQuery: string) => void;
    setEditableNodeDetails: (editableNodeDetails: TEditableNodeDetails) => void;
    setSelectedNode: (selectedNode: TreeItem) => void;
    setToBeDeletedNode: (toBeDeletedNode: TreeItem) => void;
    setToBeAddedNodeDetails: (toBeAddedNodeDetails: TEditableNodeDetails) => void;
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
