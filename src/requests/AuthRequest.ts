import { IIdentifyStoreResponse, REQUEST_METHOD, ROUTES } from '@sellerspot/universal-types';

import BaseRequest from './BaseRequest';

export default class AuthRequest extends BaseRequest {
    constructor() {
        super(ROUTES.SERVICE.AUTH);
    }

    async getTenantDetails(): Promise<IIdentifyStoreResponse> {
        return <IIdentifyStoreResponse>await this.request({
            url: `${ROUTES.AUTH.IDENTIFY_STORE}`,
            method: REQUEST_METHOD.GET,
        });
    }
}
