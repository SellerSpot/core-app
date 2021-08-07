import { requests } from 'requests/requests';
import { IInventoryData } from '@sellerspot/universal-types';

export class InventoryService {
    static getAllProducts = async (): Promise<IInventoryData[]> => {
        // reqesting
        const { status, data } = await requests.pos.inventoryRequest.getAllProduct();
        return status ? data : [];
    };
}
