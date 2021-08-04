import { requests } from 'requests/requests';
import { ITaxGroupData } from '@sellerspot/universal-types';

export class TaxGroupSectionService {
    static getAllTaxGroup = async (): Promise<ITaxGroupData[]> => {
        // request
        const { data, status } = await requests.catalogue.taxSettingsRequest.getAllTaxGroup();
        // action
        if (status) {
            return data;
        }
        return [];
    };
}
