import { IProductData } from '@sellerspot/universal-types';
import { IProductSliderProps } from 'components/Compounds/SliderModals/ProductSlider/ProductSlider.types';

export interface IProductPageState {
    allProducts: IProductData[];
    isLoading: boolean;
    sliderModal: Pick<IProductSliderProps, 'showModal' | 'mode' | 'prefillData'>;
}
