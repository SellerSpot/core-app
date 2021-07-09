import { State } from '@hookstate/core';
import { TaxBracketSlider } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider';
import { TaxBracketSliderService } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider.service';
import { ITaxBracketSliderProps } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider.types';
import { ITaxSettingPageState } from 'pages/Catalogue/TaxSetting/TaxSetting.types';
import React, { ReactElement, useRef } from 'react';
import { TaxBracketSliderBaseService } from './TaxBracketSliderBase.service';

interface ITaxBracketSliderBaseProps {
    sectionState: State<ITaxSettingPageState['taxBracketSection']>;
    getAllTaxBrackets: () => Promise<void>;
}

export const TaxBracketSliderBase = (props: ITaxBracketSliderBaseProps): ReactElement => {
    // props
    const { sectionState, getAllTaxBrackets } = props;

    // refs
    const taxBracketSliderFormRef: ITaxBracketSliderProps['formRef'] = useRef(null);

    // handlers
    const onCloseHandler: ITaxBracketSliderProps['onClose'] = async (props) => {
        await TaxBracketSliderService.handleOnCloseTaxBracketSliderModal({
            onCloseProps: props,
            sliderState: {
                showModal: sectionState.sliderModal.showModal,
            },
        });
    };
    const onSubmitHandler: ITaxBracketSliderProps['onSubmit'] = async ({ values }) => {
        if (sectionState.sliderModal.mode.get() === 'create') {
            await TaxBracketSliderBaseService.createNewTaxBracket(values);
        } else {
            await TaxBracketSliderBaseService.editTaxBracket({
                id: sectionState.sliderModal.prefillData.id.get(),
                ...values,
            });
        }
        await getAllTaxBrackets();
        sectionState.sliderModal.merge({
            showModal: false,
        });
    };

    //compile data
    const taxBracketSliderProps: ITaxBracketSliderProps = {
        showModal: sectionState.sliderModal.showModal.get(),
        formRef: taxBracketSliderFormRef,
        mode: sectionState.sliderModal.mode.get(),
        prefillData: sectionState.sliderModal.prefillData.get(),
        onClose: onCloseHandler,
        onSubmit: onSubmitHandler,
        level: 1,
    };

    // draw
    return <TaxBracketSlider {...taxBracketSliderProps} />;
};
