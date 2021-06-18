import { State } from '@hookstate/core';
import { IStockUnitData } from '@sellerspot/universal-types';

export interface IStockUnitSliderState {
    showSliderModal: boolean;
    isEditMode: boolean;
    prefillData: IStockUnitData;
}
export interface IStockUnitSliderProps {
    sliderState: State<IStockUnitSliderState>;
    getAllBrand: () => Promise<void>;
}

export interface IStockUnitSliderForm {
    name: string;
}
