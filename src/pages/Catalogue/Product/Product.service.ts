import { requests } from 'requests/requests';
import { IProductData } from '@sellerspot/universal-types';

export class ProductService {
    static getAllProducts = async (): Promise<IProductData[]> => {
        const { data, status } = await requests.catalogue.productRequest.getAllProduct();
        if (status) {
            return data;
        }
        return [];
    };
}
