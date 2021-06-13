import { IBrandData, ICategoryData } from '@sellerspot/universal-types';
import { IProductSliderState } from './Components/ProductSlider/ProductSlider.types';

export interface IProduct {
    name: string;
    barcode: string;
    brand: IBrandData;
    category: ICategoryData;
}

export interface IProductsPageState {
    products: IProduct[];
    slider: IProductSliderState;
}
