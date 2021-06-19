import { IBrandData } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';

export class BrandsService {
    static getAllBrands = async (): Promise<IBrandData[]> => {
        // reqesting
        const { status, data } = await requests.catalogue.brandRequest.getAllBrands();
        if (status) {
            return data;
        } else {
            return [];
        }
    };
}
