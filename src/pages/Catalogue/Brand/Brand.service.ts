import { IBrandData } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';

export class BrandService {
    static getAllBrand = async (): Promise<IBrandData[]> => {
        // reqesting
        const { status, data } = await requests.catalogue.brandRequest.getAllBrand();
        if (status) {
            return data;
        } else {
            return [];
        }
    };
}
