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
        if (status) {
            // return store details
            return <IUserDetails>(<unknown>data.store); // neeed to tweak in univ-types and auth-server for exact response
        } else {
            showNotify('Invalid Store, please identify your store.');
            introduceDelay(1500);
            return false;
        }
    }

    static redirectToAccountsAppSignInRoute(): void {
        const {
            app: { tenantDetails },
        } = store.getState();
        const { domainName, isCustomDomain } = tenantDetails?.domainDetails ?? {};

        if (domainName) {
            const signInRoute = isCustomDomain
                ? domainName
                : `${CONFIG.ACCOUNTS_APP_SIGN_IN}${domainName}.${CONFIG.BASE_DOMAIN_NAME}`;

            redirectTo(signInRoute);
        } else {
            TenantProviderService.redirectToAccountsAppIdentifyStoreRoute();
        }
    }
}
