import { requests } from 'requests/requests';
import { ITaxGroupData } from '../../../../../../.yalc/@sellerspot/universal-types/dist';

export class TaxGroupSectionService {
    static getAllTaxGroup = async (): Promise<ITaxGroupData[]> => {
        const { data, status } = await requests.catalogue.taxSettingsRequest.getAllTaxGroup();
        if (status) {
            return data;
        }
        return [];
    };
}
