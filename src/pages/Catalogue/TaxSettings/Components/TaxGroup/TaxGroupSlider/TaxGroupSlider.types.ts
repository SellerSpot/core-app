import { State } from '@hookstate/core';
import { ITaxGroupData } from '@sellerspot/universal-types';

export interface ITaxGroupSliderState {
    showSliderModal: boolean;
    isEditMode: boolean;
    prefillData: ITaxGroupData;
}
export interface ITaxGroupSliderProps {
    sliderState: State<ITaxGroupSliderState>;
    getAllTaxGroup: () => Promise<void>;
}

export interface ITaxGroupSliderForm {
    name: string;
}
