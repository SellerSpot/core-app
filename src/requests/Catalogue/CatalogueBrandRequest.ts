import {
    ICreateBrandRequest,
    ICreateBrandResponse,
    IDeleteBrandResponse,
    IEditBrandResponse,
    IGetAllBrandResponse,
} from '@sellerspot/universal-types';
import BaseRequest from 'requests/BaseRequest';
import { accessCatalogueServer } from './CatalogueServer';

export default class CatalogueBrandRequest extends BaseRequest {
    constructor() {
        super('CATALOGUE');
    }

    getAllBrand = async (): Promise<IGetAllBrandResponse> => {
        return await accessCatalogueServer().getAllBrand();
    };

    createNewBrand = async (values: ICreateBrandRequest): Promise<ICreateBrandResponse> => {
        return await accessCatalogueServer().createNewBrand(values);
    };

    deleteBrand = async (brandId: string): Promise<IDeleteBrandResponse> => {
        return await accessCatalogueServer().deleteBrand(brandId);
    };
    editBrand = async (data: { name: string; id: string }): Promise<IEditBrandResponse> => {
        return await accessCatalogueServer().editBrand(data);
    };
}
