import { ReactSortableTreeProps, TreeItem } from 'react-sortable-tree';

export interface ICategoryViewProps {
    treeData: TreeItem[];
    selectedNode: TreeItem;
    searchQuery: string;
    isLoading: boolean;
    canDragNodes: boolean;
    onChangeCallback: ReactSortableTreeProps['onChange'];
    onMoveNode: ReactSortableTreeProps['onMoveNode'];
    canDrop: ReactSortableTreeProps['canDrop'];
    onSelectNodeCallback?: (node: TreeItem) => (event: React.MouseEvent) => void;
    createCategoryCallback: (node: TreeItem) => void;
    editCategoryCallback: (node: TreeItem) => void;
    deleteCategoryCallback: (node: TreeItem) => void;
}
