import { ITaxBracketData } from '@sellerspot/universal-types';
import { ITaxBracketSliderModalProps } from 'components/Compounds/SliderModals/TaxBracketSliderModal/TaxBracketSliderModal.types';
import { ITaxGroupSliderModalProps } from 'components/Compounds/SliderModals/TaxGroupSliderModal/TaxGroupSliderModal.types';

export interface ITaxSettingPageState {
    allTaxBrackets: ITaxBracketData[];
    taxBracketSection: {
        isTableLoading: boolean;
        sliderModal: Pick<ITaxBracketSliderModalProps, 'showModal' | 'mode' | 'prefillData'>;
    };
    taxGroupSection: {
        allTaxGroups: ITaxBracketData[];
        isTableLoading: boolean;
        sliderModal: Pick<ITaxGroupSliderModalProps, 'showModal' | 'mode' | 'prefillData'>;
        taxBracketSliderModal: Pick<
            ITaxBracketSliderModalProps,
            'showModal' | 'mode' | 'prefillData'
        >;
    };
}
