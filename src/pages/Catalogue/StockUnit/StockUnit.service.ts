import { requests } from 'requests/requests';
import { IStockUnitData } from '@sellerspot/universal-types';

export class StockUnitService {
    static getAllStockUnit = async (): Promise<IStockUnitData[]> => {
        // request
        const { data, status } = await requests.catalogue.stockUnitRequest.getAllStockUnit();
        // action
        if (status) {
            return data;
        }
        return [];
    };
}
