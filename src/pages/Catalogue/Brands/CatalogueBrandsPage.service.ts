import { IGetAllBrandsResponse } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';

export class CatalogueBrandsPageService {
    // gets all brand data to populate the table
    static getAllBrandsData = async (): Promise<IGetAllBrandsResponse['data']> => {
        const allBrandsData = await requests.catalogue.brandRequest.getAllBrands();
        return allBrandsData;
    };
}
