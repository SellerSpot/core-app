import { IBrandData } from '@sellerspot/universal-types';

export interface IBrandsPageState {
    brands: IBrandData[];
    slider: {
        showSliderModal: boolean;
        isEditMode: boolean;
    };
}
