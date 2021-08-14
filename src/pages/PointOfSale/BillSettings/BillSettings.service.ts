import { introduceDelay, ISelectOption } from '@sellerspot/universal-components';
import { EBILL_SIZES, IBillSettings } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';
import { TBillDimensions } from './BillSettings.types';

export class BillSettingsService {
    static billDimentsions: TBillDimensions = {
        BILL_A4: { width: 793 },
        BILL_90MM: { width: 340 },
    };

    static billOptions: ISelectOption<keyof typeof EBILL_SIZES>[] = [
        { key: 'BILL_A4', label: 'A4', value: 'a4id' },
        { key: 'BILL_90MM', label: '90mm', value: '90mmid' },
    ];

    static fetchBillSettings = async (): Promise<IBillSettings> => {
        await introduceDelay(500);
        const billSettingsResponse = await requests.pos.billSettingsRequest.getBillSettings();
        if (billSettingsResponse.status) return billSettingsResponse.data;
        else throw new Error(billSettingsResponse.error.message ?? billSettingsResponse.error.key);
    };

    static updateBillSettings = async (billSettings: IBillSettings): Promise<IBillSettings> => {
        await introduceDelay(500);
        const billSettingsResponse = await requests.pos.billSettingsRequest.updateBillSettings({
            billSettings,
        });
        if (billSettingsResponse.status) return billSettingsResponse.data;
        else throw new Error(billSettingsResponse.error.message ?? billSettingsResponse.error.key);
    };
}
