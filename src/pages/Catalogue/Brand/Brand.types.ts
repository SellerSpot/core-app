import { IBrandData } from '@sellerspot/universal-types';
import { IBrandSliderProps } from 'components/Compounds/SliderModals/BrandSlider/BrandSlider.types';

export interface IBrandPageState {
    brands: IBrandData[];
    isBrandTableLoading: boolean;
    sliderModal: Pick<IBrandSliderProps, 'showModal' | 'prefillData' | 'mode'>;
}
