import { ITaxBracketData, ITaxGroupData } from '@sellerspot/universal-types';
import { ITaxBracketSliderProps } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider.types';
import { ITaxGroupSliderState } from './Components/TaxGroup/TaxGroupSlider/TaxGroupSlider.types';

export interface ITaxSettingsState {
    taxBrackets: ITaxBracketData[];
    taxGroups: ITaxGroupData[];
    isTaxBracketTableLoading: boolean;
    isTaxGroupTableLoading: boolean;
    taxBracketSlider: Pick<ITaxBracketSliderProps, 'showModal' | 'prefillData' | 'mode'>;
    taxGroupSlider: ITaxGroupSliderState;
}

export interface ITaxSettingsDataStoreState {
    taxBrackets: ITaxBracketData[];
    taxGroups: ITaxGroupData[];
}
