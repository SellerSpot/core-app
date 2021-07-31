import { introduceDelay } from '@sellerspot/universal-components';
import { IBillSettings } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';
import { IBillData, TBillDimensions } from './BillSettings.types';

export class BillSettingsService {
    static billDimentsions: TBillDimensions = {
        BILL_A4: { width: 793 },
        BILL_90MM: { width: 340 },
    };

    static dummyBillData: IBillData = {
        productCartInformation: [],
        totals: {
            grandTotal: 0,
            grandTotalDiscount: 0,
            grandTotalTax: 0,
            grandTotalTaxPercentage: 0,
        },
    };

    static fetchBillSettings = async (): Promise<IBillSettings> => {
        await introduceDelay(2000);
        const billSettingsResponse = await requests.pos.billSettingsRequest.getBillSettings();
        if (billSettingsResponse.status) return billSettingsResponse.data;
        else throw new Error(billSettingsResponse.error.message ?? billSettingsResponse.error.key);
    };

    static updateBillSettings = async (billSettings: IBillSettings): Promise<IBillSettings> => {
        await introduceDelay(2000);
        const billSettingsResponse = await requests.pos.billSettingsRequest.updateBillSettings({
            billSettings,
        });
        if (billSettingsResponse.status) return billSettingsResponse.data;
        else throw new Error(billSettingsResponse.error.message ?? billSettingsResponse.error.key);
    };
}
