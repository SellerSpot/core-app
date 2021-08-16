import { State } from '@hookstate/core';
import { ITaxBracketSliderModalProps } from 'components/Compounds/SliderModals/TaxBracketSliderModal/TaxBracketSliderModal.types';
import { TaxGroupSliderModal } from 'components/Compounds/SliderModals/TaxGroupSliderModal/TaxGroupSliderModal';
import { TaxGroupSliderModalService } from 'components/Compounds/SliderModals/TaxGroupSliderModal/TaxGroupSliderModal.service';
import { ITaxGroupSliderModalProps } from 'components/Compounds/SliderModals/TaxGroupSliderModal/TaxGroupSliderModal.types';
import { ITaxSettingPageState } from 'pages/Catalogue/TaxSetting/TaxSetting.types';
import React, { ReactElement, useRef } from 'react';

interface ITaxGroupSliderBaseProps {
    taxBracketSliderModalState: State<
        ITaxSettingPageState['taxGroupSection']['taxBracketSliderModal']
    >;
    taxGroupSliderModalState: State<ITaxSettingPageState['taxGroupSection']['sliderModal']>;
    getAllTaxGroup: () => Promise<void>;
    getAllTaxBracket: () => Promise<void>;
}

export const TaxGroupSliderBase = (props: ITaxGroupSliderBaseProps): ReactElement => {
    // props
    const {
        getAllTaxGroup,
        getAllTaxBracket,
        taxBracketSliderModalState,
        taxGroupSliderModalState,
    } = props;

    // refs
    const taxBracketSliderFormRef: ITaxBracketSliderModalProps['formRef'] = useRef(null);
    const taxGroupSliderFormRef: ITaxGroupSliderModalProps['formRef'] = useRef(null);

    // handlers
    const handleOnCloseTaxGroupSlider: ITaxGroupSliderModalProps['onClose'] = async (props) => {
        // state
        const taxBracketSliderFormState = taxBracketSliderFormRef.current?.getState();

        // compute
        await TaxGroupSliderModalService.handleOnCloseTaxGroupSliderModal({
            onCloseProps: props,
            sliderModalState: taxGroupSliderModalState,
            taxBracketSliderModal: {
                onCloseProps: {
                    dirty: taxBracketSliderFormState?.dirty,
                    submitting: taxBracketSliderFormState?.submitting,
                    event: null,
                    source: 'backdrop',
                },
                sliderModalState: {
                    showModal: taxBracketSliderModalState.showModal,
                },
            },
        });
    };
    const onSubmitTaxGroupSlider: ITaxGroupSliderModalProps['onSubmit'] = async ({ values }) => {
        if (taxGroupSliderModalState.mode.get() === 'create') {
            await TaxGroupSliderModalService.createTaxGroup(values);
        } else {
            await TaxGroupSliderModalService.editTaxGroup({
                bracket: values.bracket,
                id: taxGroupSliderModalState.prefillData.get()['id'],
                name: values.name,
            });
        }
        taxGroupSliderModalState.showModal.set(false);
        getAllTaxGroup();
    };

    // compile data
    const taxGroupSliderModalProps: ITaxGroupSliderModalProps = {
        showModal: taxGroupSliderModalState.showModal.get(),
        formRef: taxGroupSliderFormRef,
        mode: taxGroupSliderModalState.mode.get(),
        isPageOnStandby: false,
        prefillData: taxGroupSliderModalState.prefillData.get(),
        onClose: handleOnCloseTaxGroupSlider,
        onSubmit: onSubmitTaxGroupSlider,
        postTaxBracketCreation: getAllTaxBracket,
        level: 1,
    };

    // draw
    return <TaxGroupSliderModal {...taxGroupSliderModalProps} />;
};
