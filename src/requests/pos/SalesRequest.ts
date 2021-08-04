import BaseRequest from 'requests/BaseRequest';
import {
    ESaleStatus,
    IGetAllSalesHistoryQueryParams,
    IGetAllSalesHistoryResponse,
    ROUTES,
} from '@sellerspot/universal-types';
import { introduceDelay } from '@sellerspot/universal-components';
import { Dummies } from 'dummies/Dummies';

export default class SalesRequest extends BaseRequest {
    constructor() {
        super('POS');
    }

    getAllSalesHistory = async <T extends IGetAllSalesHistoryResponse>(
        type?: ESaleStatus,
    ): Promise<T> => {
        const query: IGetAllSalesHistoryQueryParams = {
            type,
        };
        await introduceDelay(1000);
        return <T>{
            status: true,
            data: {
                salesHistory: Dummies.getSalesData(),
            },
        };
        return <T>await this.request({
            url: ROUTES.POS.SALES.GET_ALL,
            method: 'GET',
            query: query,
        });
    };
}
