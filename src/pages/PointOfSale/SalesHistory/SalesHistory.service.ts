import { ISaleData } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';

export class SalesHistoryService {
    static fetchSalesHistory = async (): Promise<ISaleData[]> => {
        const response = await requests.pos.salesRequest.getAllSalesHistory();
        if (response.status) {
            return response.data.salesHistory;
        }
        throw new Error(response.error.message ?? 'Something went wrong!');
    };
}
