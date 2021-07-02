import { requests } from 'requests/requests';
import {
    ICreateTaxBracketRequest,
    ITaxBracketData,
    ITaxGroupData,
} from '@sellerspot/universal-types';
import { ITaxBracketSliderForm } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider.types';

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

    static createNewTaxBracket = async (
        values: ITaxBracketSliderForm,
    ): Promise<ITaxBracketData> => {
        const { name, rate } = values;
        const requestData: ICreateTaxBracketRequest = {
            name,
            rate: +rate,
        };
        const { data, status } = await requests.catalogue.taxSettingsRequest.createNewTaxBracket(
            requestData,
        );
        if (status) {
            return data;
        }

        return null;
    };

    static editTaxBracket = async (props: {
        name: string;
        rate: number;
        id: string;
    }): Promise<ITaxBracketData> => {
        const { name, id, rate } = props;
        const { data, status } = await requests.catalogue.taxSettingsRequest.editTaxBracket({
            name,
            rate,
            id,
        });
        if (status) {
            return data;
        }
        return null;
    };
}
