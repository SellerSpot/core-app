import {
    ICreateBrandRequest,
    ICreateBrandResponse,
    IGetAllBrandResponse,
} from '@sellerspot/universal-types';
import BaseRequest from 'requests/BaseRequest';
import { accessCatalogueServer } from './CatalogueServer';

export default class CatalogueBrandsRequest extends BaseRequest {
    constructor() {
        super('CATALOGUE');
    }

    getAllBrands = async (): Promise<IGetAllBrandResponse> => {
        return await accessCatalogueServer().getAllBrands();
    };

    createNewBrand = async (values: ICreateBrandRequest): Promise<ICreateBrandResponse> => {
        return await accessCatalogueServer().createNewBrand(values);
    };
}
