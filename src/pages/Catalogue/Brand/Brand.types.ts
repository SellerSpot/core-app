import { IBrandData } from '@sellerspot/universal-types';
import { IBrandSliderModalProps } from 'components/Compounds/SliderModals/BrandSliderModal/BrandSliderModal.types';

export interface IBrandPageState {
    brands: IBrandData[];
    isBrandTableLoading: boolean;
    sliderModal: Pick<IBrandSliderModalProps, 'showModal' | 'prefillData' | 'mode'>;
}
