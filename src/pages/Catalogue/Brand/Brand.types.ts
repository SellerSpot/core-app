import { IBrandData } from '@sellerspot/universal-types';
import { IBrandSliderState } from './Components/BrandSlider/BrandSlider.types';

export interface IBrandPageState {
    brands: IBrandData[];
    isBrandTableLoading: boolean;
    slider: IBrandSliderState;
}
