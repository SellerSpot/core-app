import BaseRequest from 'requests/BaseRequest';
import {
    ESaleStatus,
    IGetAllSalesHistoryQueryParams,
    IGetBillSettingsResponse,
    ROUTES,
} from '@sellerspot/universal-types';

export default class BillSettingRequest extends BaseRequest {
    constructor() {
        super('POS');
    }

    getAllSalesHistory = async (type?: ESaleStatus): Promise<IGetBillSettingsResponse> => {
        const query: IGetAllSalesHistoryQueryParams = {
            type,
        };
        return <IGetBillSettingsResponse>await this.request({
            url: ROUTES.POS.SALES.GET_ALL,
            method: 'GET',
            query: query,
        });
    };
}
