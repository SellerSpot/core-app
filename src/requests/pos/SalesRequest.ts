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
    IRetrieveSalePathParams,
    IRetrieveSaleResponse,
    IDeleteParkedSalePathParams,
    IDeleteParkedSaleResponse,
    IVoidSalePathParams,
    IVoidSaleResponse,
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
            url: ROUTES.POS.SALES.CREATE_NEW_SALE,
            method: 'POST',
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
            url: ROUTES.POS.SALES.PARK_SALE,
            method: 'POST',
            payload,
        });
    };

    retrieveSale = async (
        retrieveSaleId?: IRetrieveSalePathParams['id'],
    ): Promise<IRetrieveSaleResponse> => {
        const param: IRetrieveSalePathParams = {
            id: retrieveSaleId,
        };
        await introduceDelay(1000);
        return <IRetrieveSaleResponse>{
            status: true,
            data: Dummies.salesHistory.getSalesData()[0],
        };
        return <IRetrieveSaleResponse>await this.request({
            url: ROUTES.POS.SALES.RETRIEVE_SALE,
            method: 'GET',
            param,
        });
    };

    voidSale = async (voidSaleId?: IVoidSalePathParams['id']): Promise<IVoidSaleResponse> => {
        const param: IVoidSalePathParams = {
            id: voidSaleId,
        };
        await introduceDelay(1000);
        return <IVoidSaleResponse>{
            status: true,
            data: Dummies.salesHistory.getSalesData()[0],
        };
        return <IVoidSaleResponse>await this.request({
            url: ROUTES.POS.SALES.VOID_SALE,
            method: 'PUT',
            param,
        });
    };

    deleteParkedSale = async (
        parkedSaleId?: IDeleteParkedSalePathParams['id'],
    ): Promise<IDeleteParkedSaleResponse> => {
        const param: IDeleteParkedSalePathParams = {
            id: parkedSaleId,
        };
        await introduceDelay(1000);
        return <IDeleteParkedSaleResponse>{
            status: true,
            data: Dummies.salesHistory.getSalesData()[0],
        };
        return <IDeleteParkedSaleResponse>await this.request({
            url: ROUTES.POS.SALES.DELETE_PARKED_SALE,
            method: 'DELETE',
            param,
        });
    };
}
