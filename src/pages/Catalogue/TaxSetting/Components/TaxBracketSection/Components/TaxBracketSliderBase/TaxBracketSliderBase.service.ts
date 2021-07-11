import { ICreateTaxBracketRequest, ITaxBracketData } from '@sellerspot/universal-types';
import { ITaxBracketSliderForm } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider.types';
import { requests } from 'requests/requests';

export class TaxBracketSliderBaseService {
    static createNewTaxBracket = async (
        values: ITaxBracketSliderForm,
    ): Promise<ITaxBracketData> => {
        // props
        const { name, rate } = values;
        // compile data
        const requestData: ICreateTaxBracketRequest = {
            name,
            rate: +rate,
        };
        // request
        const { data, status } = await requests.catalogue.taxSettingsRequest.createNewTaxBracket(
            requestData,
        );
        // conditional
        if (status) {
            // return
            return data;
        }
        // return
        return null;
    };

    static editTaxBracket = async (values: ITaxBracketData): Promise<ITaxBracketData> => {
        // props
        const { name, id, rate } = values;

        // request
        const { data, status } = await requests.catalogue.taxSettingsRequest.editTaxBracket({
            name,
            rate: +rate,
            id,
        });
        // conditional
        if (status) {
            // return
            return data;
        }
        // return
        return null;
    };
}
