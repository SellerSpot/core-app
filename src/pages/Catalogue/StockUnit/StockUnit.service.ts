import { requests } from 'requests/requests';
import { IStockUnitData } from '@sellerspot/universal-types';

export class StockUnitService {
    static getAllStockUnit = async (): Promise<IStockUnitData[]> => {
        const { data, status } = await requests.catalogue.stockUnitRequest.getAllStockUnit();
        if (status) {
            return data;
        }
        return [];
    };
}
