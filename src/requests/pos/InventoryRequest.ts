import BaseRequest from 'requests/BaseRequest';
import {
    IAddProductToInventoryResponse,
    IInventoryData,
    IInventoryResourcePathParam,
    ISearchInventoryProductsResponse,
    ISearchResourceQueryParam,
    ROUTES,
} from '@sellerspot/universal-types';
import { IGetAllInventoryProductResponse } from '@sellerspot/universal-types';

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

    searchProduct = async (
        searchQuery: string,
        /**
         * if not passed it will fetch results from all outlets
         */
        outletid = '',
    ): Promise<ISearchInventoryProductsResponse> => {
        const query: ISearchResourceQueryParam = {
            query: searchQuery,
        };
        const param: IInventoryResourcePathParam = {
            outletid,
        };
        return <ISearchInventoryProductsResponse>await this.request({
            url: ROUTES.POS.INVENTORY.SEARCH,
            method: 'GET',
            query,
            param,
        });
    };

    addProductToInventory = async (
        values: IInventoryData,
    ): Promise<IAddProductToInventoryResponse> => {
        return <IAddProductToInventoryResponse>await this.request({
            url: ROUTES.POS.INVENTORY.CREATE,
            method: 'POST',
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
