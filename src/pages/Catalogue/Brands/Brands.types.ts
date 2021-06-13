import { IBrandData } from '@sellerspot/universal-types';
import { IBrandSliderState } from './Components/BrandsSlider/BrandsSlider.types';

export interface IBrandsPageState {
    brands: IBrandData[];
    slider: IBrandSliderState;
}
