import { IStockUnitData } from '@sellerspot/universal-types';
import { IStockUnitSliderState } from './Components/StockUnitSlider/StockUnitSlider.types';

export interface IStockUnitPageState {
    stockUnits: IStockUnitData[];
    isStockUnitTableLoading: boolean;
    slider: IStockUnitSliderState;
}
