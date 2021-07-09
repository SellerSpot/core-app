import { requests } from 'requests/requests';
import { ITaxBracketData } from '@sellerspot/universal-types';

export class TaxBracketSectionService {
    static getAllTaxBracket = async (): Promise<ITaxBracketData[]> => {
        const { data, status } = await requests.catalogue.taxSettingsRequest.getAllTaxBracket();
        if (status) {
            return data;
        }
        return [];
    };
}
