import {
    IAddProductToInventoryRequest,
    IAddProductToInventoryResponse,
    IEditProductInInventoryRequest,
    IEditProductInInventoryResponse,
    IGetAllInventoryProductResponse,
    IGetInventoryByProductIdResponse,
    ISearchInventoryProductsResponse,
    ROUTES,
} from '@sellerspot/universal-types';
import BaseRequest from 'requests/BaseRequest';

export default class InventoryRequest extends BaseRequest {
    constructor() {
        super('POS');
    }

    getAllProduct = async (): Promise<IGetAllInventoryProductResponse> => {
        return <IGetAllInventoryProductResponse>await this.request({
            url: ROUTES.POS.INVENTORY.GET_ALL,
            method: 'GET',
        });
    };

    getInventoryByProductId = async (
        productId: string,
    ): Promise<IGetInventoryByProductIdResponse> => {
        return <IGetInventoryByProductIdResponse>await this.request({
            url: ROUTES.POS.INVENTORY.GET_BY_PRODUCT_ID,
            method: 'GET',
            param: { productid: productId },
        });
    };

    searchProduct = async (query: string): Promise<ISearchInventoryProductsResponse> => {
        return <ISearchInventoryProductsResponse>await this.request({
            url: ROUTES.POS.INVENTORY.SEARCH,
            method: 'GET',
            query: { query },
            param: { outletid: '' },
        });
    };

    addProductToInventory = async (
        values: IAddProductToInventoryRequest,
    ): Promise<IAddProductToInventoryResponse> => {
        return <IAddProductToInventoryResponse>await this.request({
            url: ROUTES.POS.INVENTORY.CREATE,
            method: 'POST',
            payload: values,
        });
    };

    editProductInInventory = async (
        values: IEditProductInInventoryRequest,
    ): Promise<IEditProductInInventoryResponse> => {
        return <IEditProductInInventoryResponse>await this.request({
            url: ROUTES.POS.INVENTORY.EDIT,
            method: 'PUT',
            payload: values,
        });
    };

    deleteProductFromAllOutlets = async (
        productId: string,
    ): Promise<ISearchInventoryProductsResponse> => {
        return <ISearchInventoryProductsResponse>await this.request({
            url: ROUTES.POS.INVENTORY.DELETE,
            method: 'DELETE',
            param: { productid: productId, outletid: '' },
        });
    };
}
