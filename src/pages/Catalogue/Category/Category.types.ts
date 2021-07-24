import { ICategorySliderProps } from 'components/Compounds/SliderModals/CategorySlider/CategorySlider.types';
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
    sliderModal: Pick<ICategorySliderProps, 'showModal' | 'prefillData' | 'mode' | 'contextData'>;
}
