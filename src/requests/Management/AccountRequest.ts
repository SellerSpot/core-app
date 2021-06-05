import { IResponse, ROUTES } from '@sellerspot/universal-types';

import BaseRequest from '../BaseRequest';

export default class AccountRequest extends BaseRequest {
    constructor() {
        super(ROUTES.SERVICE.AUTH);
    }
    /**
     * logout the user by clearing cookies through server
     */
    async deleteAccount(): Promise<IResponse> {
        return { status: true };
    }
}
