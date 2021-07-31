import BaseRequest from 'requests/BaseRequest';
import {
    IGetBillSettingsResponse,
    IUpdateBillSettingsRequest,
    IUpdateBillSettingsResponse,
    ROUTES,
} from '@sellerspot/universal-types';

export default class BillSettingRequest extends BaseRequest {
    constructor() {
        super('POS');
    }

    getBillSettings = async (): Promise<IGetBillSettingsResponse> => {
        return <IGetBillSettingsResponse>await this.request({
            url: ROUTES.POS.BILL_SETTINGS.GET,
            method: 'GET',
        });
    };

    updateBillSettings = async (
        reqBody: IUpdateBillSettingsRequest,
    ): Promise<IUpdateBillSettingsResponse> => {
        return <IUpdateBillSettingsResponse>await this.request({
            url: ROUTES.POS.BILL_SETTINGS.UPDATE,
            method: 'PUT',
            payload: <IUpdateBillSettingsRequest>{
                billSettings: reqBody.billSettings,
            },
        });
    };
}
