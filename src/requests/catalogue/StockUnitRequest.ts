import {
    ICommonResourcePathParam,
    ICreateStockUnitRequest,
    ICreateStockUnitResponse,
    IDeleteStockUnitResponse,
    IEditStockUnitRequest,
    IEditStockUnitResponse,
    IGetAllStockUnitResponse,
    ISearchResourceQueryParam,
    ISearchStockUnitResponse,
    ROUTES,
} from '@sellerspot/universal-types';
import BaseRequest from 'requests/BaseRequest';

export default class StockUnitRequest extends BaseRequest {
    constructor() {
        super('CATALOGUE');
    }

    getAllStockUnit = async (): Promise<IGetAllStockUnitResponse> => {
        return <IGetAllStockUnitResponse>await this.request({
            url: ROUTES.CATALOGUE.STOCK_UNIT.GET_ALL,
            method: 'GET',
        });
    };

    searchStockUnit = async (queryString: string): Promise<ISearchStockUnitResponse> => {
        const query: ISearchResourceQueryParam = { query: queryString };
        return <ISearchStockUnitResponse>await this.request({
            url: ROUTES.CATALOGUE.STOCK_UNIT.SEARCH,
            method: 'GET',
            query,
        });
    };

    createNewStockUnit = async (
        payload: ICreateStockUnitRequest,
    ): Promise<ICreateStockUnitResponse> => {
        return <ICreateStockUnitResponse>await this.request({
            url: ROUTES.CATALOGUE.STOCK_UNIT.CREATE,
            method: 'POST',
            payload,
        });
    };

    deleteStockUnit = async (stockUnitId: string): Promise<IDeleteStockUnitResponse> => {
        const param: ICommonResourcePathParam = {
            id: stockUnitId,
        };
        return <IDeleteStockUnitResponse>await this.request({
            url: ROUTES.CATALOGUE.STOCK_UNIT.DELETE,
            method: 'DELETE',
            param,
        });
    };

    editStockUnit = async (
        id: string,
        payload: IEditStockUnitRequest,
    ): Promise<IEditStockUnitResponse> => {
        const param: ICommonResourcePathParam = {
            id,
        };
        return <IEditStockUnitResponse>await this.request({
            url: ROUTES.CATALOGUE.STOCK_UNIT.EDIT,
            method: 'PUT',
            payload,
            param,
        });
    };
}
