import BaseRequest from 'requests/BaseRequest';
import {
    IAddProductToInventoryResponse,
    IInventoryData,
    IInventoryResourcePathParam,
    ISearchInventoryProductsResponse,
    ISearchInventoryQueryParam,
    ROUTES,
} from '@sellerspot/universal-types';
import { IGetAllInventoryProductResponse } from '@sellerspot/universal-types';
import { introduceDelay } from '../../../.yalc/@sellerspot/universal-components/dist';
import { Dummies } from 'dummies/Dummies';

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

    /**
     * if outletId not passed it will fetch results from all outlets
     */
    searchProduct = async ({
        searchQuery = '',
        outletid = '',
        lookup = 'all',
    }: {
        searchQuery: string;
        outletid?: IInventoryResourcePathParam['outletid'];
        lookup?: ISearchInventoryQueryParam['lookup'];
    }): Promise<ISearchInventoryProductsResponse> => {
        const query: ISearchInventoryQueryParam = {
            query: searchQuery,
            lookup,
        };
        const param: IInventoryResourcePathParam = {
            outletid,
        };
        await introduceDelay(500);
        return {
            status: true,
            data: {
                inventory: Dummies.newSale.getInventoryProducts(),
            },
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
