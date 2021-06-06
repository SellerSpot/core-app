import { IResponse, REQUEST_METHOD, ROUTES } from '@sellerspot/universal-types';

import BaseRequest from '../BaseRequest';

export default class StoreRequest extends BaseRequest {
    constructor() {
        super(ROUTES.SERVICE.CORE);
    }
    /**
     * logout the user by clearing cookies through server
     */
    async deleteStore(): Promise<IResponse> {
        return await this.request({
            method: REQUEST_METHOD.DELETE,
            url: ROUTES.CORE.DELETE_TENANT,
        });
    }
}
