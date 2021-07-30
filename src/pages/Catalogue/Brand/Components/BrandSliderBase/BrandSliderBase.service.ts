import { IBrandData } from '@sellerspot/universal-types';
import { IBrandSliderForm } from 'components/Compounds/SliderModals/BrandSliderModal/BrandSliderModal.types';
import { requests } from 'requests/requests';

export class BrandSliderBaseService {
    static createNewBrand = async (values: IBrandSliderForm): Promise<IBrandData> => {
        // props
        const { name } = values;

        // request
        const { data, status } = await requests.catalogue.brandRequest.createNewBrand({ name });

        // action
        if (status) {
            return data;
        }
        return null;
    };

    static editBrand = async (props: { name: string; id: string }): Promise<IBrandData> => {
        // props
        const { name, id } = props;

        // request
        const { data, status } = await requests.catalogue.brandRequest.editBrand({ id, name });

        // actions
        if (status) {
            return data;
        }
        return null;
    };
}
