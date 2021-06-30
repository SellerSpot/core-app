import {
    ICreateBrandRequest,
    ICreateBrandResponse,
    IEditBrandResponse,
    IGetAllBrandResponse,
    IResponse,
} from '@sellerspot/universal-types';
import BaseRequest from 'requests/BaseRequest';
import { accessCatalogueServer } from './Server';

export default class BrandRequest extends BaseRequest {
    constructor() {
        super('CATALOGUE');
    }

    getAllBrand = async (): Promise<IGetAllBrandResponse> => {
        return await accessCatalogueServer().getAllBrand();
    };

    createNewBrand = async (values: ICreateBrandRequest): Promise<ICreateBrandResponse> => {
        return await accessCatalogueServer().createNewBrand(values);
    };

    deleteBrand = async (brandId: string): Promise<IResponse> => {
        return await accessCatalogueServer().deleteBrand(brandId);
    };
    editBrand = async (data: { name: string; id: string }): Promise<IEditBrandResponse> => {
        return await accessCatalogueServer().editBrand(data);
    };
}
