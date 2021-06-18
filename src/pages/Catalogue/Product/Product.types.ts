import { IProductData } from 'requests/Catalogue/CatalogueServer';
import { IProductSliderState } from './Components/ProductSlider/ProductSlider.types';

export interface IProductPageState {
    products: IProductData[];
    slider: IProductSliderState;
}
