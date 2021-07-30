import {
    ICreateProductRequest,
    ICreateProductResponse,
    IEditProductRequest,
    IEditProductResponse,
    IGetAllProductResponse,
    ISearchProductResponse,
    ROUTES,
} from '@sellerspot/universal-types';
import BaseRequest from 'requests/BaseRequest';

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

    searchProduct = async (query: string): Promise<ISearchProductResponse> => {
        return <ISearchProductResponse>await this.request({
            url: `${ROUTES.CATALOGUE.PRODUCT.SEARCH}?query=${query}`,
            method: 'GET',
        });
    };

    createNewProduct = async (values: ICreateProductRequest): Promise<ICreateProductResponse> => {
        return <ICreateProductResponse>await this.request({
            url: ROUTES.CATALOGUE.PRODUCT.CREATE,
            method: 'POST',
            payload: values,
        });
    };

    deleteProduct = async (ProductId: string): Promise<void> => {
        await this.request({
            url: ROUTES.CATALOGUE.PRODUCT.DELETE.replace(':id', ProductId),
            method: 'DELETE',
        });
    };
    editProduct = async (
        data: IEditProductRequest & { id: string },
    ): Promise<IEditProductResponse> => {
        return <ICreateProductResponse>await this.request({
            url: ROUTES.CATALOGUE.PRODUCT.EDIT.replace(':id', data.id),
            method: 'PUT',
            payload: <IEditProductRequest>{
                name: data.name,
            },
        });
    };
}
