import { IResponse, ROUTES } from '@sellerspot/universal-types';

import BaseRequest from '../BaseRequest';

export default class SettingsRequest extends BaseRequest {
    constructor() {
        super('CORE');
    }
    /**
     * logout the user by clearing cookies through server
     */
    async deleteStore(): Promise<IResponse> {
        return await this.request({
            url: ROUTES.CORE.TENANT.DELETE_TENANT,
            method: 'DELETE',
        });
    }
}
