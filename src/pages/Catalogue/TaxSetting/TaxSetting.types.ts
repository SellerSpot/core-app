import { ITaxBracketData, ITaxGroupData } from '@sellerspot/universal-types';
import { ITaxBracketSliderProps } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider.types';
import { ITaxGroupSliderProps } from 'components/Compounds/SliderModals/TaxGroupSlider/TaxGroupSlider.types';

export interface ITaxSettingPageState {
    taxBracketSection: {
        allTaxBrackets: ITaxBracketData[];
        isTableLoading: boolean;
        sliderModal: Pick<ITaxBracketSliderProps, 'showModal' | 'mode' | 'prefillData'>;
    };
    taxGroupSection: {
        allTaxGroups: ITaxGroupData[];
        isTableLoading: boolean;
        sliderModal: Pick<ITaxGroupSliderProps, 'showModal' | 'mode' | 'prefillData'>;
    };
}
