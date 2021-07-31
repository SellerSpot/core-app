import {
    ICreateBrandRequest,
    ICreateBrandResponse,
    IDeleteBrandResponse,
    IEditBrandRequest,
    IEditBrandResponse,
    IGetAllBrandResponse,
    ROUTES,
} from '@sellerspot/universal-types';
import BaseRequest from 'requests/BaseRequest';

export default class BrandRequest extends BaseRequest {
    constructor() {
        super('CATALOGUE');
    }

    getAllBrand = async (): Promise<IGetAllBrandResponse> => {
        return <IGetAllBrandResponse>await this.request({
            url: ROUTES.CATALOGUE.BRAND.GET_ALL,
            method: 'GET',
        });
    };

    createNewBrand = async (values: ICreateBrandRequest): Promise<ICreateBrandResponse> => {
        return <ICreateBrandResponse>await this.request({
            url: ROUTES.CATALOGUE.BRAND.CREATE,
            method: 'POST',
            payload: values,
        });
    };

    deleteBrand = async (brandId: string): Promise<IDeleteBrandResponse> => {
        return <ICreateBrandResponse>await this.request({
            url: ROUTES.CATALOGUE.BRAND.DELETE.replace(':id', brandId),
            method: 'DELETE',
        });
    };
    editBrand = async (data: IEditBrandRequest & { id: string }): Promise<IEditBrandResponse> => {
        return <ICreateBrandResponse>await this.request({
            url: ROUTES.CATALOGUE.BRAND.EDIT.replace(':id', data.id),
            method: 'PUT',
            payload: <IEditBrandRequest>{
                name: data.name,
            },
        });
    };
}
