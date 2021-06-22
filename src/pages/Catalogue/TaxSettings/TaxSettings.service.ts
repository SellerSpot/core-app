import { requests } from 'requests/requests';
import { ITaxBracketData, ITaxGroupData } from '@sellerspot/universal-types';

export class TaxSettingsService {
    static getAllTaxBracket = async (): Promise<ITaxBracketData[]> => {
        const { data, status } = await requests.catalogue.taxSettingsRequest.getAllTaxBracket();
        if (status) {
            return data;
        }
        return [];
    };
    static getAllTaxGroup = async (): Promise<ITaxGroupData[]> => {
        const { data, status } = await requests.catalogue.taxSettingsRequest.getAllTaxGroup();
        if (status) {
            return data;
        }
        return [];
    };
}
