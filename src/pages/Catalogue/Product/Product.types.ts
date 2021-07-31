import { IProductData } from '@sellerspot/universal-types';
import { IBrandSliderModalProps } from 'components/Compounds/SliderModals/BrandSliderModal/BrandSliderModal.types';
import { ICategorySliderModalProps } from 'components/Compounds/SliderModals/CategorySliderModal/CategorySliderModal.types';
import { IProductSliderModalProps } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.types';
import { ISelectCategorySliderModalProps } from 'components/Compounds/SliderModals/SelectCategorySliderModal/SelectCategorySliderModal.types';
import { IStockUnitSliderModalProps } from 'components/Compounds/SliderModals/StockUnitSliderModal/StockUnitSliderModal.types';
import { ITaxBracketSliderModalProps } from 'components/Compounds/SliderModals/TaxBracketSliderModal/TaxBracketSliderModal.types';
import { ITaxGroupSliderModalProps } from 'components/Compounds/SliderModals/TaxGroupSliderModal/TaxGroupSliderModal.types';
import { TreeItem } from 'react-sortable-tree';

export interface IProductPageState {
    allProducts: IProductData[];
    isLoading: boolean;
    sliderModal: Pick<IProductSliderModalProps, 'showModal' | 'mode' | 'prefillData'> & {
        brandSliderModal: Pick<IBrandSliderModalProps, 'showModal' | 'mode' | 'prefillData'>;
        selectCategorySliderModal: Pick<ISelectCategorySliderModalProps, 'showModal'> & {
            categorySliderModal: Pick<
                ICategorySliderModalProps,
                'showModal' | 'mode' | 'prefillData' | 'contextData'
            >;
            treeData: TreeItem[];
        };
        stockUnitSliderModal: Pick<
            IStockUnitSliderModalProps,
            'showModal' | 'mode' | 'prefillData'
        >;
        taxBracketSliderModal: Pick<
            ITaxBracketSliderModalProps,
            'showModal' | 'mode' | 'prefillData'
        >;
        taxGroupSliderModal: Pick<ITaxGroupSliderModalProps, 'showModal' | 'mode' | 'prefillData'>;
    };
}
