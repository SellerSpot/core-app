import { requests } from 'requests/requests';

export class InventoryTableService {
    static deleteProductFromAllOutlets = async (productId: string): Promise<void> => {
        await requests.pos.inventoryRequest.deleteProductFromAllOutlets(productId);
    };
}
