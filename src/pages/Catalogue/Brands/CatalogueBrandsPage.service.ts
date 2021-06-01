import { IGetAllBrandResponse } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';

export class CatalogueBrandsPageService {
    // gets all brand data to populate the table
    static getAllBrand = async (): Promise<IGetAllBrandResponse['data']> => {
        const listBrandData = await requests.catalogue.brandRequest.getAllBrand();
        return listBrandData.data;
    };
}
