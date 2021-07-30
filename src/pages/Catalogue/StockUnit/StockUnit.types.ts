import { IStockUnitData } from '@sellerspot/universal-types';
import { IStockUnitSliderModalProps } from 'components/Compounds/SliderModals/StockUnitSliderModal/StockUnitSliderModal.types';

export interface IStockUnitPageState {
    stockUnits: IStockUnitData[];
    isStockUnitTableLoading: boolean;
    sliderModal: Pick<IStockUnitSliderModalProps, 'showModal' | 'prefillData' | 'mode'>;
}
