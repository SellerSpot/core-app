import { IGetAllBrandsResponse } from '@sellerspot/universal-types';

export interface IAddEditBrandSliderModalHeaderProps {
    headerMode: 'add' | 'edit';
}

export interface IAddEditBrandSliderModalForm {
    name: IGetAllBrandsResponse['data'][0]['name'];
    description: IGetAllBrandsResponse['data'][0]['description'];
}
