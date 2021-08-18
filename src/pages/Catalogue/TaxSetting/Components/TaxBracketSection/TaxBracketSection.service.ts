import { requests } from 'requests/requests';
import { ITaxBracketData } from '@sellerspot/universal-types';

export class TaxBracketSectionService {
    static searchTaxBracket = async (query: string): Promise<ITaxBracketData[]> => {
        // getting response
        const { data, status } = await requests.catalogue.taxSettingsRequest.searchTaxBracket(
            query,
        );
        return status ? data : [];
    };
}
