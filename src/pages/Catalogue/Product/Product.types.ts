import { IProductData } from '@sellerspot/universal-types';
import { IBrandSliderProps } from 'components/Compounds/SliderModals/BrandSlider/BrandSlider.types';
import { ICategorySliderProps } from 'components/Compounds/SliderModals/CategorySlider/CategorySlider.types';
import { IProductSliderProps } from 'components/Compounds/SliderModals/ProductSlider/ProductSlider.types';
import { IStockUnitSliderProps } from 'components/Compounds/SliderModals/StockUnitSlider/StockUnitSlider.types';
import { ITaxBracketSliderProps } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider.types';
import { ITaxGroupSliderProps } from 'components/Compounds/SliderModals/TaxGroupSlider/TaxGroupSlider.types';

export interface IProductPageState {
    allProducts: IProductData[];
    isLoading: boolean;
    sliderModal: Pick<IProductSliderProps, 'showModal' | 'mode' | 'prefillData'> & {
        brandSliderModal: Pick<IBrandSliderProps, 'showModal' | 'mode' | 'prefillData'>;
        categorySliderModal: Pick<ICategorySliderProps, 'showModal' | 'mode' | 'prefillData'>;
        stockUnitSliderModal: Pick<IStockUnitSliderProps, 'showModal' | 'mode' | 'prefillData'>;
        taxBracketSliderModal: Pick<ITaxBracketSliderProps, 'showModal' | 'mode' | 'prefillData'>;
        taxGroupSliderModal: Pick<ITaxGroupSliderProps, 'showModal' | 'mode' | 'prefillData'>;
    };
}
