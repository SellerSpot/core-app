import { requests } from 'requests/requests';
import { IInventoryData, IOutletData } from '@sellerspot/universal-types';

export class InventoryService {
    static getAllOutlets = async (): Promise<IOutletData[]> => {
        // requesting
        const { data, status } = await requests.catalogue.outletRequest.getAllOutlet();
        return status ? data : [];
    };
    static getAllProducts = async (): Promise<IInventoryData[]> => {
        // reqesting
        const { status, data } = await requests.pos.inventoryRequest.getAllProduct();
        return status ? data : [];
    };
}
