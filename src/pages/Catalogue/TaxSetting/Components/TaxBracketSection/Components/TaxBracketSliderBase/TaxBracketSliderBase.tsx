import { State } from '@hookstate/core';
import { TaxBracketSlider } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider';
import { TaxBracketSliderService } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider.service';
import { ITaxBracketSliderProps } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider.types';
import { ITaxSettingPageState } from 'pages/Catalogue/TaxSetting/TaxSetting.types';
import React, { ReactElement, useRef } from 'react';
import { TaxBracketSliderBaseService } from './TaxBracketSliderBase.service';

interface ITaxBracketSliderBaseProps {
    sliderState: State<ITaxSettingPageState['taxBracketSection']['sliderModal']>;
    getAllTaxBrackets: () => Promise<void>;
}

export const TaxBracketSliderBase = (props: ITaxBracketSliderBaseProps): ReactElement => {
    // props
    const { sliderState, getAllTaxBrackets } = props;

    // refs
    const taxBracketSliderFormRef: ITaxBracketSliderProps['formRef'] = useRef(null);

    // handlers
    const onCloseHandler: ITaxBracketSliderProps['onClose'] = async (props) => {
        await TaxBracketSliderService.handleOnCloseTaxBracketSliderModal({
            onCloseProps: props,
            sliderState: {
                showModal: sliderState.showModal,
            },
        });
    };
    const onSubmitHandler: ITaxBracketSliderProps['onSubmit'] = async ({ values }) => {
        if (sliderState.mode.get() === 'create') {
            await TaxBracketSliderBaseService.createNewTaxBracket(values);
        } else {
            await TaxBracketSliderBaseService.editTaxBracket({
                id: sliderState.prefillData.id.get(),
                ...values,
            });
        }
        await getAllTaxBrackets();
        sliderState.merge({
            showModal: false,
        });
    };

    //compile data
    const taxBracketSliderProps: ITaxBracketSliderProps = {
        showModal: sliderState.showModal.get(),
        formRef: taxBracketSliderFormRef,
        mode: sliderState.mode.get(),
        prefillData: sliderState.prefillData.get(),
        onClose: onCloseHandler,
        onSubmit: onSubmitHandler,
        level: 1,
    };

    // draw
    return <TaxBracketSlider {...taxBracketSliderProps} />;
};
