import {
    ICommonResourcePathParam,
    ICreateProductRequest,
    ICreateProductResponse,
    IEditProductRequest,
    IEditProductResponse,
    IGetAllProductResponse,
    ISearchProductResponse,
    ROUTES,
} from '@sellerspot/universal-types';
import BaseRequest from 'requests/BaseRequest';
import { IProductSearchPathParam } from '../../../.yalc/@sellerspot/universal-types/dist/catalogue/product/routes';

export default class ProductRequest extends BaseRequest {
    constructor() {
        super('CATALOGUE');
    }

    getAllProduct = async (): Promise<IGetAllProductResponse> => {
        return <IGetAllProductResponse>await this.request({
            url: ROUTES.CATALOGUE.PRODUCT.GET_ALL,
            method: 'GET',
        });
    };

    searchProduct = async (queryString: string): Promise<ISearchProductResponse> => {
        // change interface name
        const query: IProductSearchPathParam = {
            query: queryString,
        };
        return <ISearchProductResponse>await this.request({
            url: ROUTES.CATALOGUE.PRODUCT.SEARCH,
            method: 'GET',
            query,
        });
    };

    createNewProduct = async (payload: ICreateProductRequest): Promise<ICreateProductResponse> => {
        return <ICreateProductResponse>await this.request({
            url: ROUTES.CATALOGUE.PRODUCT.CREATE,
            method: 'POST',
            payload,
        });
    };

    deleteProduct = async (productId: string): Promise<void> => {
        const param: ICommonResourcePathParam = {
            id: productId,
        };
        await this.request({
            url: ROUTES.CATALOGUE.PRODUCT.DELETE,
            method: 'DELETE',
            param,
        });
    };
    editProduct = async (
        productId: string,
        payload: IEditProductRequest,
    ): Promise<IEditProductResponse> => {
        const param: ICommonResourcePathParam = { id: productId };
        return <IEditProductResponse>await this.request({
            url: ROUTES.CATALOGUE.PRODUCT.EDIT,
            method: 'PUT',
            payload,
            param,
        });
    };
}
