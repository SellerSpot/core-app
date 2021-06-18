import { IProductData } from 'requests/Catalogue/Server';
import { IProductSliderState } from './Components/ProductSlider/ProductSlider.types';

export interface IProductPageState {
    products: IProductData[];
    slider: IProductSliderState;
}
