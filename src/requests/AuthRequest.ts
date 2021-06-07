import {
    ICurrentUserResponse,
    IIdentifyStoreResponse,
    IResponse,
    REQUEST_METHOD,
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
            url: ROUTES.AUTH.IDENTIFY_STORE,
            method: REQUEST_METHOD.GET,
        });
    }

    /**
     * If user is authenticated it will return the current user's details.
     */
    async getUserDetails(): Promise<ICurrentUserResponse> {
        return <ICurrentUserResponse>await this.request({
            url: ROUTES.AUTH.CURRENT_USER,
            method: REQUEST_METHOD.GET,
        });
    }

    /**
     * logout the user by clearing cookies through server
     */
    async logoutUser(): Promise<IResponse> {
        return <IResponse>await this.request({
            url: ROUTES.AUTH.SIGN_OUT,
            method: REQUEST_METHOD.POST,
        });
    }
}
