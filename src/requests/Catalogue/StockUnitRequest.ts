import {
    ICreateStockUnitRequest,
    ICreateStockUnitResponse,
    IDeleteStockUnitResponse,
    IEditStockUnitRequest,
    IEditStockUnitResponse,
    IGetAllStockUnitResponse,
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

    createNewStockUnit = async (
        values: ICreateStockUnitRequest,
    ): Promise<ICreateStockUnitResponse> => {
        return <ICreateStockUnitResponse>await this.request({
            url: ROUTES.CATALOGUE.STOCK_UNIT.CREATE,
            method: 'POST',
            payload: <ICreateStockUnitRequest>values,
        });
    };

    deleteStockUnit = async (stockUnitId: string): Promise<IDeleteStockUnitResponse> => {
        return <IDeleteStockUnitResponse>await this.request({
            url: ROUTES.CATALOGUE.STOCK_UNIT.DELETE.replace(':id', stockUnitId),
            method: 'DELETE',
        });
    };

    editStockUnit = async (
        data: IEditStockUnitRequest & { id: string },
    ): Promise<IEditStockUnitResponse> => {
        return <IEditStockUnitResponse>await this.request({
            url: ROUTES.CATALOGUE.STOCK_UNIT.EDIT.replace(':id', data.id),
            method: 'PUT',
            payload: <IEditStockUnitRequest>{ name: data.name, unit: data.unit },
        });
    };
}
