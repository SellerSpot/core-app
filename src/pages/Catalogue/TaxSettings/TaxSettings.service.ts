import { requests } from 'requests/requests';
import { ITaxBracketData } from '@sellerspot/universal-types';

export class TaxSettingsService {
    static getAllTaxBracket = async (): Promise<ITaxBracketData[]> => {
        const { data, status } = await requests.catalogue.taxBracketRequest.getAllTaxBracket();
        if (status) {
            return data;
        }
        return [];
    };
}
