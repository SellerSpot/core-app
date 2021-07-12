import { requests } from 'requests/requests';
import { ITaxGroupData } from '../../../../../../.yalc/@sellerspot/universal-types/dist';

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
