import { IStockUnitSliderState } from './Components/StockUnitSlider/StockUnitSlider.types';

export interface IStockUnit {
    id: string;
    unit: string;
}

export interface IStockUnitPageState {
    stockUnits: IStockUnit[];
    isStockUnitTableLoading: boolean;
    slider: IStockUnitSliderState;
}
