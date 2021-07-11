import { IBrandSliderForm } from 'components/Compounds/SliderModals/BrandSlider/BrandSlider.types';
import { requests } from 'requests/requests';
import { IBrandData, ICreateBrandRequest } from '@sellerspot/universal-types';

export class BrandSliderBaseService {
    static createNewBrand = async (values: IBrandSliderForm): Promise<IBrandData> => {
        const { name } = values;
        const requestData: ICreateBrandRequest = {
            name,
        };
        const { data, status } = await requests.catalogue.brandRequest.createNewBrand(requestData);
        if (status) {
            return data;
        }
        return null;
    };

    static editBrand = async (props: { name: string; id: string }): Promise<IBrandData> => {
        const { name, id } = props;
        const requestData = {
            name,
            id,
        };
        const { data, status } = await requests.catalogue.brandRequest.editBrand(requestData);
        if (status) {
            return data;
        }
        return null;
    };
}
