import { ITaxBracketData, ITaxGroupData } from '@sellerspot/universal-types';
import { ITaxBracketSliderState } from './Components/TaxBracket/TaxBracketSlider/TaxBracketSlider.types';
import { ITaxGroupSliderState } from './Components/TaxGroup/TaxGroupSlider/TaxGroupSlider.types';

export interface ITaxSettingsState {
    taxBrackets: ITaxBracketData[];
    taxGroups: ITaxGroupData[];
    isTaxBracketTableLoading: boolean;
    taxBracketSlider: ITaxBracketSliderState;
    taxGroupSlider: ITaxGroupSliderState;
}
