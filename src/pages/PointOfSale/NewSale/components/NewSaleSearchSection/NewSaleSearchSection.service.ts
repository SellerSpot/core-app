import { introduceDelay } from '@sellerspot/universal-components';
import { IInventoryData } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';

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
            await introduceDelay(500);
            const { data, status, error } = await requests.pos.inventoryRequest.searchProduct({
                searchQuery,
                lookup: 'inventory',
                outletid: '', // pass user's default outletId
            });
            if (status) {
                return {
                    passedQuery: searchQuery,
                    results: data.inventory || [],
                };
            } else {
                throw error;
            }
        } catch (error) {
            return { passedQuery: searchQuery, results: [] };
        }
    };
}
