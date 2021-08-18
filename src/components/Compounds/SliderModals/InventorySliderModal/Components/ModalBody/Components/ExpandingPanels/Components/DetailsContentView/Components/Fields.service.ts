import { ITaxBracketData } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';
import { ISelectOption } from '@sellerspot/universal-components';

export class FieldsService {
    static convertITaxBracketDataToISelect = (
        bracketData: ITaxBracketData,
    ): ISelectOption<ITaxBracketData> => {
        return {
            label: bracketData.name,
            value: bracketData.id,
            meta: bracketData,
        };
    };

    static searchTaxBrackets = async (query: string): Promise<ITaxBracketData[]> => {
        const { data, status } = await requests.catalogue.taxSettingsRequest.searchTaxBracket(
            query,
        );
        return status ? data : [];
    };
}
