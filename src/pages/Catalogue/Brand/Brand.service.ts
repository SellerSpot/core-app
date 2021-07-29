import { IBrandData } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';

export class BrandService {
    static getAllBrand = async (): Promise<IBrandData[]> => {
        // reqesting
        const { status, data } = await requests.catalogue.brandRequest.getAllBrand();
        return status ? data : [];
    };

    static searchBrand = async (query: string): Promise<IBrandData[]> => {
        // requesting
        const { status, data } = await requests.catalogue.brandRequest.searchBrand(query);
        return status ? data : [];
    };
}
