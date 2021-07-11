import { ICreateTaxGroupRequest, ITaxGroupData } from '@sellerspot/universal-types';
import { ITaxGroupSliderForm } from 'components/Compounds/SliderModals/TaxGroupSlider/TaxGroupSlider.types';
import { requests } from 'requests/requests';

export class TaxGroupSliderBaseService {
    static createTaxGroup = async (values: ITaxGroupSliderForm): Promise<ITaxGroupData> => {
        // compile data
        const requestData: ICreateTaxGroupRequest = {
            name: values.name,
            bracket: values.bracket.map((bracket) => bracket.value),
        };

        // request
        const { data, status } = await requests.catalogue.taxSettingsRequest.createNewTaxGroup(
            requestData,
        );

        // handle response
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

        // handle response
        if (status) {
            return data;
        }
        return null;
    };
}
