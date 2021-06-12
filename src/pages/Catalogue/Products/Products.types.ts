import { IBrandData, ICategoryData } from '@sellerspot/universal-types';

export interface IProduct {
    name: string;
    barcode: string;
    brand: IBrandData;
    category: ICategoryData;
}

export interface IProductsPageState {
    products: IProduct[];
}
