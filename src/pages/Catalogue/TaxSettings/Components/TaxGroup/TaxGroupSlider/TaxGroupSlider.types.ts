import { State } from '@hookstate/core';
import { ITaxGroupData } from '@sellerspot/universal-types';
import { ISelectOption } from '../../../../../../../.yalc/@sellerspot/universal-components/dist';

export interface ITaxGroupSliderState {
    showSliderModal: boolean;
    isEditMode: boolean;
    prefillData: ITaxGroupData;
}
export interface ITaxGroupSliderProps {
    sliderState: State<ITaxGroupSliderState>;
    getAllTaxGroup: () => Promise<void>;
    allTaxGroup: ITaxGroupData[];
}

export interface ITaxGroupSliderForm {
    name: string;
    taxBrackets: ISelectOption[];
}
