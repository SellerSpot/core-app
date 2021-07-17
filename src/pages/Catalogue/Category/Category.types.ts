import { IColors } from '@sellerspot/universal-components';
import { ExtendedNodeData, TreeItem } from 'react-sortable-tree';

interface ICategory {
    id: string;
    title: string;
    /**
     * Used to help identified newly created nodes
     */
    createdNew?: boolean;
    children?: ICategory[];
}

export interface ICategoryProps {
    categoriesData: ICategory[];
}

type TEditableNodeDetails = {
    node: TreeItem;
    path: string[];
};

export interface IUseCategoryStore {
    treeData: TreeItem[];
    searchQuery: string;
    editableNodeDetails: TEditableNodeDetails;
    selectedNode: TreeItem;
    toBeDeletedNode: TreeItem;
    toBeAddedNodeDetails: TEditableNodeDetails;
}

export type TOpenPopperHandler = (props: { anchorEl: HTMLElement }) => void;
export type IInputFieldOnChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export interface ICategoryNodeDataStoreProps {
    data: ExtendedNodeData;
    isEditable: boolean;
    isSelected: boolean;
    isParentNode: boolean;
    isToBeDeleted: boolean;
    colors: IColors;
}

export type TSetSortableTreeDataState = React.Dispatch<React.SetStateAction<TreeItem[]>>;
export type TTitleInputFieldEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
