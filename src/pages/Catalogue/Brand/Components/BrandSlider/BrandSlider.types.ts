import { State } from '@hookstate/core';
import { IBrandData } from '@sellerspot/universal-types';

export interface IBrandSliderState {
    showSliderModal: boolean;
    isEditMode: boolean;
    prefillData: IBrandData;
}
export interface IBrandSliderProps {
    sliderState: State<IBrandSliderState>;
    getAllBrand: () => Promise<void>;
}

export interface IBrandSliderForm {
    name: string;
}
