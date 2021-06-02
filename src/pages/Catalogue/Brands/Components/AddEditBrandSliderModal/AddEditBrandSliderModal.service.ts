import { IBrandData, ICreateBrandRequest } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';

export class AddEditBrandSliderModalService {
    static createBrand = async (data: ICreateBrandRequest): Promise<IBrandData> => {
        const response = await requests.catalogue.brandRequest.createBrand(data);
        const newBrandData = response.data;
        return newBrandData;
    };
}
