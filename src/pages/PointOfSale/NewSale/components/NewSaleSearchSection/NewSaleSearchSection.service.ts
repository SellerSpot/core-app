import { introduceDelay } from '@sellerspot/universal-components';
import { IInventoryData } from '@sellerspot/universal-types';
import { Dummies } from 'dummies/Dummies';

export class NewSaleSearchSectionService {
    static searchInventoryProducts = async (
        searchQuery: string,
    ): Promise<{
        /**
         * used to manage the race conditions // later we'll implement the abort controller
         */
        passedQuery: string;
        results: IInventoryData[];
    }> => {
        try {
            if (searchQuery.length === 0) {
                throw new Error('Invalid query');
            }
            await introduceDelay(1000);
            return { passedQuery: searchQuery, results: Dummies.newSale.getInventoryProducts() };
        } catch (error) {
            return { passedQuery: searchQuery, results: [] };
        }
    };
}
