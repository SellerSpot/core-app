import BaseRequest from 'requests/BaseRequest';
import {
    ESaleStatus,
    IGetAllSalesHistoryQueryParams,
    IGetAllSalesHistoryResponse,
    ICreateNewSaleRequest,
    ICreateNewSaleResponse,
    IParkSaleRequest,
    IParkSaleResponse,
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
                salesHistory: Dummies.salesHistory.getSalesData(),
            },
        };
        return <T>await this.request({
            url: ROUTES.POS.SALES.GET_ALL,
            method: 'GET',
            query: query,
        });
    };

    createNewSale = async (
        saleData?: ICreateNewSaleRequest['payload'],
    ): Promise<ICreateNewSaleResponse> => {
        const payload: ICreateNewSaleRequest = {
            payload: saleData,
        };
        await introduceDelay(1000);
        return <ICreateNewSaleResponse>{
            status: true,
            data: saleData,
        };
        return <ICreateNewSaleResponse>await this.request({
            url: ROUTES.POS.SALES.GET_ALL,
            method: 'GET',
            payload,
        });
    };

    parkSale = async (saleData?: IParkSaleRequest['payload']): Promise<IParkSaleResponse> => {
        const payload: IParkSaleRequest = {
            payload: saleData,
        };
        await introduceDelay(1000);
        return <IParkSaleResponse>{
            status: true,
            data: saleData,
        };
        return <IParkSaleResponse>await this.request({
            url: ROUTES.POS.SALES.GET_ALL,
            method: 'GET',
            payload,
        });
    };
}
