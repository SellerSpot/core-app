import { State } from '@hookstate/core';

export interface ITaxBracketSliderForm {
    name: string;
    rate: number;
}

export interface ITaxBracketSliderState {
    showSliderModal: boolean;
    bracketName: string;
}

export interface ITaxBracketSliderProps {
    sliderState: State<ITaxBracketSliderState>;
}
