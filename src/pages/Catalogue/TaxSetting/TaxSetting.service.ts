import { requests } from 'requests/requests';
import { ITaxBracketData } from '../../../../.yalc/@sellerspot/universal-types/dist';

export class TaxSettingService {
    static getAllTaxBracket = async (): Promise<ITaxBracketData[]> => {
        const { data, status } = await requests.catalogue.taxSettingsRequest.getAllTaxBracket();
        if (status) {
            return data;
        }
        return [];
    };
}
