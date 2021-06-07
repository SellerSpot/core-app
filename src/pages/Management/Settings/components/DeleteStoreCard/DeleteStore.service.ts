import { IResponse } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';

export default class DeleteStoreService {
    public static async deleteStore(): Promise<IResponse> {
        return await requests.management.storeRequest.deleteStore();
    }
}
