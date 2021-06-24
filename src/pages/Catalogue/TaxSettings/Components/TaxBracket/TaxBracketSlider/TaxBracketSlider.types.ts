import { State } from '@hookstate/core';
import { ITaxBracketData } from '@sellerspot/universal-types';

export interface ITaxBracketSliderState {
    showSliderModal: boolean;
    isEditMode: boolean;
    prefillData: ITaxBracketData;
}
export interface ITaxBracketSliderProps {
    sliderState: State<ITaxBracketSliderState>;
    getAllTaxBracket: () => Promise<void>;
}

export interface ITaxBracketSliderForm {
    name: string;
    rate: number;
}
