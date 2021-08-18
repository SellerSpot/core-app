import {
    IAddProductToInventoryRequest,
    IAddProductToInventoryResponse,
    IEditProductInInventoryRequest,
    IEditProductInInventoryResponse,
    IGetAllInventoryProductResponse,
    IGetInventoryByProductIdResponse,
    IInventoryResourcePathParam,
    ISearchInventoryProductsResponse,
    ISearchInventoryQueryParam,
    ROUTES,
} from '@sellerspot/universal-types';
import BaseRequest from 'requests/BaseRequest';

interface ISearchInventoryProps {
    searchQuery: string;
    outletid?: IInventoryResourcePathParam['outletid'];
    lookup?: ISearchInventoryQueryParam['lookup'];
}

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

    /**
     * if outletId not passed it will fetch results from all outlets
     */
    searchInventory = async (
        props: ISearchInventoryProps,
    ): Promise<ISearchInventoryProductsResponse> => {
        const { searchQuery = '', outletid = '', lookup = 'all' } = props;

        const query: ISearchInventoryQueryParam = {
            query: searchQuery,
            lookup,
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
