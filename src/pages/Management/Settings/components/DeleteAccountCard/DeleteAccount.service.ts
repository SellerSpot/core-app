import { IResponse } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';

export default class DeleteAccountService {
    public static async deleteAccount(): Promise<IResponse> {
        return await requests.management.accountRequest.deleteAccount();
    }
}
