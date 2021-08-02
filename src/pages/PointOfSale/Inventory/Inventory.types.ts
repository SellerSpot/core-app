import { IInventoryData } from '../../../../.yalc/@sellerspot/universal-types/dist';
import { IInventorySliderModalProps } from '../../../components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';
export interface IInventoryPageState {
    inventory: IInventoryData[];
    sliderModal: Pick<IInventorySliderModalProps, 'mode' | 'prefillData' | 'showModal'>;
}
