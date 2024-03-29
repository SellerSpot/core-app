import { showNotify } from '@sellerspot/universal-components';
import { IStoreDetails } from '@sellerspot/universal-types';
import { CONFIG } from 'config/config';
import { requests } from 'requests/requests';
import { introduceDelay, redirectTo } from 'utilities/general';

export default class TenantProviderService {
    static async getTenantDetails(): Promise<IStoreDetails | false> {
        const { status, data } = await requests.authRequest.getTenantDetails();
        if (status && data?.store) {
            // return store details
            return data.store;
        } else {
            showNotify('Invalid Store, please identify your store.');
            await introduceDelay(2000);
            return false;
        }
    }

    static redirectToAccountsAppIdentifyStoreRoute(): void {
        redirectTo(CONFIG.ACCOUNTS_APP_IDENTIFY_STORE_ROUTE);
    }
}
