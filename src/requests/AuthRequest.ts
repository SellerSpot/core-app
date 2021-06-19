import {
    ICurrentUserResponse,
    IIdentifyStoreResponse,
    IResponse,
    ROUTES,
} from '@sellerspot/universal-types';

import BaseRequest from './BaseRequest';

export default class AuthRequest extends BaseRequest {
    constructor() {
        super('AUTH');
    }

    /**
     * Gets all details required to mount the teant specific app
     */
    async getTenantDetails(): Promise<IIdentifyStoreResponse> {
        return <IIdentifyStoreResponse>await this.request({
            url: ROUTES.AUTH.DOMAIN.IDENTIFY_STORE,
            method: 'GET',
        });
    }

    /**
     * If user is authenticated it will return the current user's details.
     */
    async getUserDetails(): Promise<ICurrentUserResponse> {
        return <ICurrentUserResponse>await this.request({
            url: ROUTES.AUTH.AUTH.CURRENT_USER,
            method: 'GET',
        });
    }

    /**
     * logout the user by clearing cookies through server
     */
    async logoutUser(): Promise<IResponse> {
        return <IResponse>await this.request({
            url: ROUTES.AUTH.AUTH.SIGN_OUT,
            method: 'POST',
        });
    }
}
