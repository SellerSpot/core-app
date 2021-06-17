import { State } from '@hookstate/core';

export interface IBrandSliderState {
    showSliderModal: boolean;
    isEditMode: boolean;
}
export interface IBrandSliderProps {
    sliderState: State<IBrandSliderState>;
    getAllBrands: () => Promise<void>;
}

export interface IBrandsSliderForm {
    name: string;
}
