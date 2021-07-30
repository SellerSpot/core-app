import { State } from '@hookstate/core';
import { TaxBracketSliderModal } from 'components/Compounds/SliderModals/TaxBracketSliderModal/TaxBracketSliderModal';
import { TaxBracketSliderService } from 'components/Compounds/SliderModals/TaxBracketSliderModal/TaxBracketSliderModal.service';
import { ITaxBracketSliderModalProps } from 'components/Compounds/SliderModals/TaxBracketSliderModal/TaxBracketSliderModal.types';
import { ITaxSettingPageState } from 'pages/Catalogue/TaxSetting/TaxSetting.types';
import React, { ReactElement, useRef } from 'react';
import { TaxBracketSliderBaseService } from './TaxBracketSliderBase.service';

interface ITaxBracketSliderBaseProps {
    sliderModalState: State<ITaxSettingPageState['taxBracketSection']['sliderModal']>;
    getAllTaxBrackets: () => Promise<void>;
}

export const TaxBracketSliderBase = (props: ITaxBracketSliderBaseProps): ReactElement => {
    // props
    const { sliderModalState, getAllTaxBrackets } = props;

    // refs
    const taxBracketSliderFormRef: ITaxBracketSliderModalProps['formRef'] = useRef(null);

    // handlers
    const onCloseHandler: ITaxBracketSliderModalProps['onClose'] = async (props) => {
        await TaxBracketSliderService.handleOnCloseTaxBracketSliderModal({
            onCloseProps: props,
            sliderModalState: {
                showModal: sliderModalState.showModal,
            },
        });
    };
    const onSubmitHandler: ITaxBracketSliderModalProps['onSubmit'] = async ({ values }) => {
        if (sliderModalState.mode.get() === 'create') {
            await TaxBracketSliderBaseService.createNewTaxBracket(values);
        } else {
            await TaxBracketSliderBaseService.editTaxBracket({
                id: sliderModalState.prefillData.id.get(),
                ...values,
            });
        }
        await getAllTaxBrackets();
        sliderModalState.merge({
            showModal: false,
        });
    };

    //compile data
    const taxBracketSliderModalProps: ITaxBracketSliderModalProps = {
        showModal: sliderModalState.showModal.get(),
        formRef: taxBracketSliderFormRef,
        mode: sliderModalState.mode.get(),
        prefillData: sliderModalState.prefillData.get(),
        onClose: onCloseHandler,
        onSubmit: onSubmitHandler,
        level: 1,
    };

    // draw
    return <TaxBracketSliderModal {...taxBracketSliderModalProps} />;
};
