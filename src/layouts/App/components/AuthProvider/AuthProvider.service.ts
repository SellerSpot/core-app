import { showNotify } from '@sellerspot/universal-components';
import { IUserDetails } from '@sellerspot/universal-types';
import { CONFIG } from 'config/config';
import { authRequest } from 'requests/requests';
import { store } from 'store/store';
import { introduceDelay, redirectTo } from 'utilities/general';
import TenantProviderService from '../TenantProvider/TenantProvider.service';

export default class AuthProviderService {
    static async getUserDetails(): Promise<IUserDetails | false> {
        const { status, data } = await authRequest.getUserDetails();
        if (status && data?.user) {
            // return store details
            return data.user;
        } else {
            showNotify('Please signin to continue...');
            introduceDelay(1500);
            return false;
        }
    }

    static redirectToAccountsAppSignInRoute(): void {
        const {
            app: { tenantDetails },
        } = store.getState();
        const { domainName } = tenantDetails?.domainDetails ?? {};

        if (domainName) {
            const signInRoute = `${CONFIG.ACCOUNTS_APP_SIGN_IN_ROUTE}${domainName}`;

            redirectTo(signInRoute);
        } else {
            TenantProviderService.redirectToAccountsAppIdentifyStoreRoute();
        }
    }
}
