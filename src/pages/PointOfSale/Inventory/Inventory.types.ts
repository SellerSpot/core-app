import { IInventoryData } from '@sellerspot/universal-types';
import { IInventorySliderModalProps } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';
export interface IInventoryPageState {
    products: IInventoryData[];
    tableIsLoading: boolean;
    sliderModal: Pick<
        IInventorySliderModalProps,
        'mode' | 'prefillData' | 'showModal' | 'allOutlets'
    >;
}
