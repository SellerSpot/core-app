import { ICategorySliderModalProps } from 'components/Compounds/SliderModals/CategorySliderModal/CategorySliderModal.types';
import { TreeItem } from 'react-sortable-tree';
import { ICategoryData } from '@sellerspot/universal-types';

export interface ICategoryProps {
    categoriesData: ICategoryData;
}

export interface ICategoryPageState {
    treeData: TreeItem[];
    searchQuery: string;
    selectedNode: TreeItem;
    isLoading: boolean;
    sliderModal: Pick<
        ICategorySliderModalProps,
        'showModal' | 'prefillData' | 'mode' | 'contextData'
    >;
}
