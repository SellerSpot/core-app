import BaseRequest from 'requests/BaseRequest';
import {
    ICreateStockUnitRequest,
    ICreateStockUnitResponse,
    IDeleteStockUnitResponse,
    IEditStockUnitResponse,
    IGetAllStockUnitResponse,
} from '@sellerspot/universal-types';
import { accessCatalogueServer } from './Server';

export default class StockUnitRequest extends BaseRequest {
    constructor() {
        super('CATALOGUE');
    }

    getAllStockUnit = async (): Promise<IGetAllStockUnitResponse> => {
        return await accessCatalogueServer().getAllStockUnit();
    };

    createNewStockUnit = async (
        values: ICreateStockUnitRequest,
    ): Promise<ICreateStockUnitResponse> => {
        return await accessCatalogueServer().createNewStockUnit(values);
    };

    deleteStockUnit = async (StockUnitId: string): Promise<IDeleteStockUnitResponse> => {
        return await accessCatalogueServer().deleteStockUnit(StockUnitId);
    };

    editStockUnit = async (data: { name: string; id: string }): Promise<IEditStockUnitResponse> => {
        return await accessCatalogueServer().editStockUnit(data);
    };
}
