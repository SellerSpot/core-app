import { State } from '@hookstate/core';
import { ITaxBracketData } from '@sellerspot/universal-types';
import { TaxBracketSliderService } from 'components/Compounds/SliderModals/TaxBracketSliderModal/TaxBracketSliderModal.service';
import { ITaxBracketSliderModalProps } from 'components/Compounds/SliderModals/TaxBracketSliderModal/TaxBracketSliderModal.types';
import { TaxGroupSliderModal } from 'components/Compounds/SliderModals/TaxGroupSliderModal/TaxGroupSliderModal';
import { TaxGroupSliderService } from 'components/Compounds/SliderModals/TaxGroupSliderModal/TaxGroupSliderModal.service';
import { ITaxGroupSliderModalProps } from 'components/Compounds/SliderModals/TaxGroupSliderModal/TaxGroupSliderModal.types';
import { ITaxSettingPageState } from 'pages/Catalogue/TaxSetting/TaxSetting.types';
import React, { ReactElement, useRef } from 'react';
import { rawClone } from 'utilities/general';
import { TaxBracketSliderBaseService } from '../../../TaxBracketSection/Components/TaxBracketSliderBase/TaxBracketSliderBase.service';
import { TaxGroupSliderBaseService } from './TaxGroupSliderBase.service';

interface ITaxGroupSliderBaseProps {
    allTaxBrackets: ITaxBracketData[];
    taxBracketSliderModalState: State<ITaxSettingPageState['taxGroupSection']['taxBracketSlider']>;
    taxGroupSliderModalState: State<ITaxSettingPageState['taxGroupSection']['sliderModal']>;
    getAllTaxGroups: () => Promise<void>;
    getAllTaxBrackets: () => Promise<void>;
}

export const TaxGroupSliderBase = (props: ITaxGroupSliderBaseProps): ReactElement => {
    // props
    const {
        getAllTaxGroups,
        allTaxBrackets,
        getAllTaxBrackets,
        taxBracketSliderModalState,
        taxGroupSliderModalState,
    } = props;

    // refs
    const taxBracketSliderFormRef: ITaxBracketSliderModalProps['formRef'] = useRef(null);
    const taxGroupSliderFormRef: ITaxGroupSliderModalProps['formRef'] = useRef(null);

    // handlers
    const handleOnCreateTaxBracket: ITaxGroupSliderModalProps['onCreateTaxBracket'] = (value) => {
        taxBracketSliderModalState.merge({
            mode: 'create',
            prefillData: {
                id: null,
                name: value,
                rate: 0,
            },
            showModal: true,
        });
    };
    const handleOnCloseTaxBracketSlider: ITaxBracketSliderModalProps['onClose'] = async (props) => {
        await TaxBracketSliderService.handleOnCloseTaxBracketSliderModal({
            onCloseProps: props,
            sliderModalState: {
                showModal: taxBracketSliderModalState.showModal,
            },
        });
    };
    const handleOnCloseTaxGroupSlider: ITaxGroupSliderModalProps['onClose'] = async (props) => {
        // state
        const taxBracketSliderFormState = taxBracketSliderFormRef.current?.getState();

        // compute
        await TaxGroupSliderService.handleOnCloseTaxGroupSliderModal({
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
            await TaxGroupSliderBaseService.createTaxGroup(values);
        } else {
            await TaxGroupSliderBaseService.editTaxGroup({
                bracket: values.bracket,
                id: taxGroupSliderModalState.prefillData.get()['id'],
                name: values.name,
            });
        }
        taxGroupSliderModalState.showModal.set(false);
        getAllTaxGroups();
    };
    const onSubmitTaxBracketSlider: ITaxBracketSliderModalProps['onSubmit'] = async ({
        values,
    }) => {
        // requesting
        const createdBracket = await TaxBracketSliderBaseService.createNewTaxBracket(values);

        // updating form
        const existingBracketsInTaxGroupSliderForm =
            taxGroupSliderFormRef.current.getFieldState('bracket').value;
        const newBracketToISelectOption =
            TaxGroupSliderService.convertTaxBracketDataToISelectOption({
                brackets: [createdBracket],
            });
        existingBracketsInTaxGroupSliderForm.push(newBracketToISelectOption[0]);
        taxGroupSliderFormRef.current.change('bracket', existingBracketsInTaxGroupSliderForm);

        // closing bracket slider
        taxBracketSliderModalState.showModal.set(false);
        getAllTaxBrackets();
    };

    // compile data
    const taxBracketSliderModalProps: ITaxBracketSliderModalProps = {
        showModal: taxBracketSliderModalState.showModal.get(),
        mode: taxBracketSliderModalState.mode.get(),
        prefillData: taxBracketSliderModalState.prefillData.get(),
        onClose: handleOnCloseTaxBracketSlider,
        onSubmit: onSubmitTaxBracketSlider,
        formRef: taxBracketSliderFormRef,
        level: 2,
    };
    const taxGroupSliderModalProps: ITaxGroupSliderModalProps = {
        showModal: taxGroupSliderModalState.showModal.get(),
        formRef: taxGroupSliderFormRef,
        mode: taxGroupSliderModalState.mode.get(),
        isPageOnStandby: false,
        prefillData: taxGroupSliderModalState.prefillData.get(),
        onClose: handleOnCloseTaxGroupSlider,
        onCreateTaxBracket: handleOnCreateTaxBracket,
        onSubmit: onSubmitTaxGroupSlider,
        taxBracketSliderModalProps,
        allTaxBrackets: rawClone(allTaxBrackets),
        level: 1,
    };

    // draw
    return <TaxGroupSliderModal {...taxGroupSliderModalProps} />;
};
