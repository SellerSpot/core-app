import { IStockUnitData } from '@sellerspot/universal-types';
import { IStockUnitSliderProps } from 'components/Compounds/SliderModals/StockUnitSlider/StockUnitSlider.types';

export interface IStockUnitPageState {
    stockUnits: IStockUnitData[];
    isStockUnitTableLoading: boolean;
    sliderModal: Pick<IStockUnitSliderProps, 'showModal' | 'prefillData' | 'mode'>;
}
