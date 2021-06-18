import { State } from '@hookstate/core';

export interface IProductSliderState {
    showSliderModal: boolean;
    isEditMode: boolean;
}
export interface IProductSliderProps {
    sliderState: State<IProductSliderState>;
}

export interface IProductSliderForm {
    name: string;
    barcode: string;
    brand: string;
}
