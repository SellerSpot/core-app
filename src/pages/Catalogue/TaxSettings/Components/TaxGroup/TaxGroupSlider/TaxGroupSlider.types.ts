import { State } from '@hookstate/core';
import { ITaxGroupData } from '@sellerspot/universal-types';
import { ISelectOption } from '@sellerspot/universal-components';
import { ITaxBracketSliderState } from './Components/TaxBracketSlider/TaxBracketSlider.types';

export interface ITaxGroupSliderState {
    showSliderModal: boolean;
    createTaxBracketSliderState: ITaxBracketSliderState;
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
