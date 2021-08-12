import { introduceDelay } from '@sellerspot/universal-components';
import { IInventoryData } from '@sellerspot/universal-types';
import { Dummies } from 'dummies/Dummies';

export class NewSaleSearchSectionService {
    static searchInventoryProducts = async (searchQuery: string): Promise<IInventoryData[]> => {
        try {
            if (searchQuery.length === 0) {
                throw new Error('Invalid query');
            }
            await introduceDelay(1000);
            return Dummies.newSale.getInventoryProducts();
        } catch (error) {
            return [];
        }
    };
}
