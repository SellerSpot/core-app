import { IProductData } from 'requests/Catalogue/CatalogueServer';
import { IProductSliderState } from './Components/ProductSlider/ProductSlider.types';

export interface IProductsPageState {
    products: IProductData[];
    slider: IProductSliderState;
}
