import { requests } from 'requests/requests';
import { ITaxBracketData } from '@sellerspot/universal-types';

export class TaxSettingService {
    static getAllTaxBracket = async (): Promise<ITaxBracketData[]> => {
        // request
        const { data, status } = await requests.catalogue.taxSettingsRequest.getAllTaxBracket();
        // action
        if (status) {
            return data;
        }
        return [];
    };
}
