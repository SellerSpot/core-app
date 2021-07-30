import { requests } from 'requests/requests';
import { IProductData } from '../../../../.yalc/@sellerspot/universal-types/dist';

export class ProductService {
    static getAllProducts = async (): Promise<IProductData[]> => {
        const { data, status } = await requests.catalogue.productRequest.getAllProduct();
        if (status) {
            return data;
        }
        return [];
    };
}
