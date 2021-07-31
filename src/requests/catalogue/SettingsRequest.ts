import BaseRequest from 'requests/BaseRequest';
import {
    IGetAllStoreCurrenciesResponse,
    IUpdateStoreCurrencyRequest,
    IUpdateStoreCurrencyResponse,
    ROUTES,
} from '@sellerspot/universal-types';

export default class SettingsRequest extends BaseRequest {
    constructor() {
        super('CORE');
    }

    getAllStoreCurrencies = async (): Promise<IGetAllStoreCurrenciesResponse> => {
        return <IGetAllStoreCurrenciesResponse>await this.request({
            url: ROUTES.CORE.STORE_CURRENCY.GET_ALL,
            method: 'GET',
        });
    };

    updateStoreCurrency = async (
        payload: IUpdateStoreCurrencyRequest,
    ): Promise<IUpdateStoreCurrencyResponse> => {
        return <IUpdateStoreCurrencyResponse>await this.request({
            url: ROUTES.CORE.STORE_CURRENCY.UPDATE,
            method: 'PUT',
            payload,
        });
    };
}
