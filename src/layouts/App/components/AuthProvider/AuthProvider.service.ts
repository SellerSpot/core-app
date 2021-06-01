import { showNotify } from '@sellerspot/universal-components';
import { ERROR_CODE, IErrorResponse, IUserDetails } from '@sellerspot/universal-types';
import { CONFIG } from 'config/config';
import { requests } from 'requests/requests';
import { resetUserDetails } from 'store/models/app';
import { store } from 'store/store';
import { introduceDelay, redirectTo } from 'utilities/general';
import TenantProviderService from '../TenantProvider/TenantProvider.service';

export default class AuthProviderService {
    static async getUserDetails(): Promise<IUserDetails | false> {
        const { status, data } = await requests.authRequest.getUserDetails();
        if (status && data?.user) {
            // return store details
            return data.user;
        } else {
            showNotify('Please signin to continue...');
            await introduceDelay(2000);
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

    static async logoutUser(): Promise<void> {
        const templateError: IErrorResponse = {
            code: ERROR_CODE.UNKNOWN_ERROR,
            message: 'Something went wrong, please try again later!',
        };
        const { status, error = templateError } = await requests.authRequest.logoutUser();
        if (status) {
            store.dispatch(resetUserDetails());
        } else {
            if (error.code && error.message) {
                showNotify(error.message);
            } else {
                showNotify(templateError.message);
            }
        }
    }
}
