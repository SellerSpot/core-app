import { TreeItem } from 'react-sortable-tree';

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

export type TSetSortableTreeDataState = React.Dispatch<React.SetStateAction<TreeItem[]>>;
export type TTitleInputFieldEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
