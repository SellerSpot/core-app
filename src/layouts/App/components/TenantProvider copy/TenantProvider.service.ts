import { showNotify } from '@sellerspot/universal-components';
import { IStoreDetails } from '@sellerspot/universal-types';
import { CONFIG } from 'config/config';
import { authRequest } from 'requests/requests';
import { introduceDelay, redirectTo } from 'utilities/general';

export default class TenantProviderService {
    static async getTenantDetails(): Promise<IStoreDetails | false> {
        const { status, data } = await authRequest.getTenantDetails();
        if (status) {
            // return store details
            return data.store;
        } else {
            showNotify('Invalid Store, please identify your store.');
            introduceDelay(1500);
            return false;
        }
    }

    static redirectToAccountsAppIdentifyStoreRoute(): void {
        redirectTo(CONFIG.ACCOUNTS_APP_IDENTIFY_STORE);
    }
}
