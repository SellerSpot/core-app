import { ITaxGroupData } from '@sellerspot/universal-types';
import { ITaxGroupSliderForm } from 'components/Compounds/SliderModals/TaxGroupSliderModal/TaxGroupSliderModal.types';
import { requests } from 'requests/requests';

export class TaxGroupSliderBaseService {
    static createTaxGroup = async (values: ITaxGroupSliderForm): Promise<ITaxGroupData> => {
        // props
        const { bracket, name } = values;

        // request
        const { data, status } = await requests.catalogue.taxSettingsRequest.createNewTaxGroup({
            name: name,
            bracket: bracket.map((bracket) => bracket.value),
        });

        // action
        if (status) {
            return data;
        }
        return null;
    };

    static editTaxGroup = async (
        values: ITaxGroupSliderForm & { id: string },
    ): Promise<ITaxGroupData> => {
        // request
        const { data, status } = await requests.catalogue.taxSettingsRequest.editTaxGroup({
            name: values.name,
            bracket: values.bracket.map((bracket) => bracket.value),
            id: values.id,
        });

        // action
        if (status) {
            return data;
        }
        return null;
    };
}
