import { ICreateTaxBracketRequest, ITaxBracketData } from '@sellerspot/universal-types';
import { ITaxBracketSliderForm } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider.types';
import { requests } from 'requests/requests';

export class TaxBracketSliderBaseService {
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
