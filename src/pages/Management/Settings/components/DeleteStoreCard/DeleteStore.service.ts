import { IResponse } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';

export default class DeleteStoreService {
    public static async deleteStore(): Promise<IResponse> {
        // request
        return await requests.management.settingsRequest.deleteStore();
    }
}
