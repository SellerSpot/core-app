import { requests } from 'requests/requests';
import { ITaxBracketData } from '@sellerspot/universal-types';

export class TaxGroupSectionService {
    static getAllTaxGroup = async (): Promise<ITaxBracketData[]> => {
        // request
        const { data, status } = await requests.catalogue.taxSettingsRequest.getAllTaxGroup();
        // action
        if (status) {
            return data;
        }
        return [];
    };
}
