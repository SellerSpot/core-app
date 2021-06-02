import { IBrandData } from '@sellerspot/universal-types';

export interface IAddEditBrandSliderModalHeaderProps {
    headerMode: 'add' | 'edit';
    submitting: boolean;
}

export interface IAddEditBrandSliderModalForm {
    name: IBrandData['name'];
}
