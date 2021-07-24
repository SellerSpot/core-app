import { IProductData } from '@sellerspot/universal-types';
import { IProductSliderState } from './Components/ProductSlider/ProductSlider.types';

export interface IProductPageState {
    products: IProductData[];
    slider: IProductSliderState;
}
