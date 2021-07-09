import { State, useState } from '@hookstate/core';
import { ITaxBracketSliderProps } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider.types';
import { TaxGroupSlider } from 'components/Compounds/SliderModals/TaxGroupSlider/TaxGroupSlider';
import { ITaxGroupSliderProps } from 'components/Compounds/SliderModals/TaxGroupSlider/TaxGroupSlider.types';
import { ITaxSettingPageState } from 'pages/Catalogue/TaxSetting/TaxSetting.types';
import React, { ReactElement } from 'react';

interface ITaxGroupSliderBaseProps {
    allTaxBrackets: ITaxSettingPageState['allTaxBrackets'];
    taxGroupSlider: State<Pick<ITaxGroupSliderProps, 'showModal' | 'prefillData' | 'mode'>>;
}
interface ITaxGroupSliderBaseState {
    taxBracketSlider: Pick<ITaxBracketSliderProps, 'showModal' | 'prefillData' | 'mode'>;
}

export const TaxGroupSliderBase = (props: ITaxGroupSliderBaseProps): ReactElement => {
    // props
    const { allTaxBrackets, taxGroupSlider } = props;

    // state
    const componentState = useState<ITaxGroupSliderBaseState>({
        taxBracketSlider: {
            showModal: false,
            prefillData: null,
            mode: 'create',
        },
    });

    // handlers
    const handleOnCreateTaxSetting: ITaxGroupSliderProps['onCreateTaxSetting'] = (value) => {
        componentState.taxBracketSlider.merge({
            mode: 'create',
            prefillData: {
                id: null,
                name: value,
                rate: 0,
            },
            showModal: true,
        });
    };
    const handleOnCloseTaxBracketSlider: ITaxBracketSliderProps['onClose'] = () => {
        componentState.taxBracketSlider.merge({
            showModal: false,
        });
    };
    const handleOnCloseTaxGroupSlider: ITaxGroupSliderProps['onClose'] = () => {
        taxGroupSlider.showModal.set(false);
    };

    // compile data
    const taxBracketSliderProps: ITaxBracketSliderProps = {
        level: 2,
        showModal: componentState.taxBracketSlider.showModal.get(),
        mode: componentState.taxBracketSlider.mode.get(),
        prefillData: componentState.taxBracketSlider.prefillData.get(),
        onClose: handleOnCloseTaxBracketSlider,
        onSubmit: null,
    };
    const taxGroupSliderProps: ITaxGroupSliderProps = {
        level: 1,
        mode: taxGroupSlider.mode.get(),
        isPageOnStandby: componentState.taxBracketSlider.showModal.get(),
        onClose: handleOnCloseTaxGroupSlider,
        onCreateTaxSetting: handleOnCreateTaxSetting,
        onSubmit: null,
        showModal: taxGroupSlider.showModal.get(),
        prefillData: taxGroupSlider.prefillData.get(),
        taxBracketSliderProps,
        allTaxBrackets,
    };

    // draw
    return <TaxGroupSlider {...taxGroupSliderProps} />;
};
