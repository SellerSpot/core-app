import { IStoreCurrency } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';
import { store } from 'store/store';
import { updateStoreCurrency } from 'store/models/app';
import { introduceDelay, showNotify } from '@sellerspot/universal-components';

export default class CurrencySettingService {
    static fetchStoreCurrencies = async (): Promise<IStoreCurrency[]> => {
        // request
        const { status, data, error } =
            await requests.catalogue.settingsRequest.getAllStoreCurrencies();
        // actions
        if (status) {
            return data;
        } else {
            throw error;
        }
    };

    static udpateStoreCurrency = async (currencyId: string): Promise<boolean> => {
        await introduceDelay(2000);
        // request
        const { status, data, error } =
            await requests.catalogue.settingsRequest.updateStoreCurrency({ currencyId });
        // actions
        if (status) {
            store.dispatch(updateStoreCurrency(data));
            showNotify(`Store currency has been updated to ${data.code} successfully!`, {
                theme: 'success',
            });
            return true;
        } else {
            throw error;
        }
    };
}
