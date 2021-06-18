import { State } from '@hookstate/core';
import { IBrandData } from '@sellerspot/universal-types';

export interface IBrandSliderState {
    showSliderModal: boolean;
    isEditMode: boolean;
    prefillBrandsData: IBrandData;
}
export interface IBrandSliderProps {
    sliderState: State<IBrandSliderState>;
    getAllBrands: () => Promise<void>;
}

export interface IBrandsSliderForm {
    name: string;
}
