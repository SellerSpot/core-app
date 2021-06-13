import { IGetAllBrandResponse } from '@sellerspot/universal-types';
import BaseRequest from 'requests/BaseRequest';
import { accessCatalogueServer } from './CatalogueServer';

export default class CatalogueBrandsRequest extends BaseRequest {
    constructor() {
        super('CATALOGUE');
    }

    getAllBrands = async (): Promise<IGetAllBrandResponse> => {
        return {
            status: true,
            data: await accessCatalogueServer().getAllBrands(),
        };
    };
}
