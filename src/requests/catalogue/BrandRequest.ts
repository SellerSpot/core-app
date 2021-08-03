import {
    ICommonResourcePathParam,
    ICreateBrandRequest,
    ICreateBrandResponse,
    IDeleteBrandResponse,
    IEditBrandRequest,
    IEditBrandResponse,
    IGetAllBrandResponse,
    ISearchBrandResponse,
    ISearchResourceQueryParam,
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

    searchBrand = async (queryString: string): Promise<ISearchBrandResponse> => {
        const query: ISearchResourceQueryParam = {
            query: queryString,
        };
        return <ISearchBrandResponse>await this.request({
            url: ROUTES.CATALOGUE.BRAND.SEARCH,
            method: 'GET',
            query,
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
        const param: ICommonResourcePathParam = { id: brandId };
        return <ICreateBrandResponse>await this.request({
            url: ROUTES.CATALOGUE.BRAND.DELETE,
            method: 'DELETE',
            param,
        });
    };
    editBrand = async (data: IEditBrandRequest & { id: string }): Promise<IEditBrandResponse> => {
        const payload: IEditBrandRequest = {
            name: data.name,
        };
        return <ICreateBrandResponse>await this.request({
            url: ROUTES.CATALOGUE.BRAND.EDIT.replace(':id', data.id),
            method: 'PUT',
            payload,
        });
    };
}
