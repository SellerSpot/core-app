import { ISearchTaxBracketRequest, ITaxBracketData } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';

interface ISearchTaxBracketsProps {
    searchQuery: string;
}

class ModalBodyService {
    static searchTaxBrackets = async (
        props: ISearchTaxBracketsProps,
    ): Promise<ITaxBracketData[]> => {
        // props
        const { searchQuery } = props;
        const requestData: ISearchTaxBracketRequest = {
            searchQuery,
        };
        const { data, status } = await requests.catalogue.taxSettingsRequest.searchTaxBracket(
            requestData,
        );
        if (status) {
            return data;
        }
        return [];
    };
}

export default ModalBodyService;
