import { State } from '@hookstate/core';
import { ITaxBracketData } from '@sellerspot/universal-types';
import { TaxBracketSliderService } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider.service';
import { ITaxBracketSliderProps } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider.types';
import { TaxGroupSlider } from 'components/Compounds/SliderModals/TaxGroupSlider/TaxGroupSlider';
import { TaxGroupSliderService } from 'components/Compounds/SliderModals/TaxGroupSlider/TaxGroupSlider.service';
import { ITaxGroupSliderProps } from 'components/Compounds/SliderModals/TaxGroupSlider/TaxGroupSlider.types';
import { ITaxSettingPageState } from 'pages/Catalogue/TaxSetting/TaxSetting.types';
import React, { ReactElement, useRef } from 'react';
import { rawClone } from 'utilities/general';
import { TaxBracketSliderBaseService } from '../../../TaxBracketSection/Components/TaxBracketSliderBase/TaxBracketSliderBase.service';
import { TaxGroupSliderBaseService } from './TaxGroupSliderBase.service';

interface ITaxGroupSliderBaseProps {
    allTaxBrackets: ITaxBracketData[];
    sectionState: State<ITaxSettingPageState['taxGroupSection']>;
    getAllTaxGroups: () => Promise<void>;
    getAllTaxBrackets: () => Promise<void>;
}

export const TaxGroupSliderBase = (props: ITaxGroupSliderBaseProps): ReactElement => {
    // props
    const { sectionState, getAllTaxGroups, allTaxBrackets, getAllTaxBrackets } = props;

    // refs
    const taxBracketSliderFormRef: ITaxBracketSliderProps['formRef'] = useRef(null);
    const taxGroupSliderFormRef: ITaxGroupSliderProps['formRef'] = useRef(null);

    // handlers
    const handleOnCreateTaxBracket: ITaxGroupSliderProps['onCreateTaxBracket'] = (value) => {
        sectionState.taxBracketSlider.merge({
            mode: 'create',
            prefillData: {
                id: null,
                name: value,
                rate: 0,
            },
            showModal: true,
        });
    };
    const handleOnCloseTaxBracketSlider: ITaxBracketSliderProps['onClose'] = async (props) => {
        await TaxBracketSliderService.handleOnCloseTaxBracketSliderModal({
            onCloseProps: props,
            sliderState: {
                showModal: sectionState.taxBracketSlider.showModal,
            },
        });
    };
    const handleOnCloseTaxGroupSlider: ITaxGroupSliderProps['onClose'] = async (props) => {
        // state
        const taxBracketSliderFormState = taxBracketSliderFormRef.current?.getState();

        // compute
        await TaxGroupSliderService.handleOnCloseTaxGroupSliderModal({
            onCloseProps: props,
            sliderState: sectionState.sliderModal,
            taxBracketSlider: {
                onCloseProps: {
                    dirty: taxBracketSliderFormState?.dirty,
                    submitting: taxBracketSliderFormState?.submitting,
                    event: null,
                    source: 'backdrop',
                },
                sliderState: {
                    showModal: sectionState.taxBracketSlider?.showModal,
                },
            },
        });
    };
    const onSubmitTaxGroupSlider: ITaxGroupSliderProps['onSubmit'] = async ({ values }) => {
        if (sectionState.sliderModal.mode.get() === 'create') {
            await TaxGroupSliderBaseService.createTaxGroup(values);
        } else {
            await TaxGroupSliderBaseService.editTaxGroup({
                bracket: values.bracket,
                id: sectionState.sliderModal.prefillData.get()['id'],
                name: values.name,
            });
        }
        sectionState.sliderModal.showModal.set(false);
        getAllTaxGroups();
    };
    const onSubmitTaxBracketSlider: ITaxBracketSliderProps['onSubmit'] = async ({ values }) => {
        // requesting
        const createdBracket = await TaxBracketSliderBaseService.createNewTaxBracket(values);

        // updating form
        const existingBracketsInTaxGroupSliderForm =
            taxGroupSliderFormRef.current.getFieldState('bracket').value;
        const newBracketToISelectOption =
            TaxGroupSliderService.convertTaxBracketDataToISelectOption([createdBracket]);
        existingBracketsInTaxGroupSliderForm.push(newBracketToISelectOption[0]);
        taxGroupSliderFormRef.current.change('bracket', existingBracketsInTaxGroupSliderForm);

        // closing bracket slider
        sectionState.taxBracketSlider.showModal.set(false);
        getAllTaxBrackets();
    };

    // useEffect(() => {
    //     console.log();
    // }, [allTaxBrackets]);

    // compile data
    const taxBracketSliderProps: ITaxBracketSliderProps = {
        showModal: sectionState.taxBracketSlider.showModal.get(),
        mode: sectionState.taxBracketSlider.mode.get(),
        prefillData: sectionState.taxBracketSlider.prefillData.get(),
        onClose: handleOnCloseTaxBracketSlider,
        onSubmit: onSubmitTaxBracketSlider,
        formRef: taxBracketSliderFormRef,
        level: 2,
    };
    const taxGroupSliderProps: ITaxGroupSliderProps = {
        showModal: sectionState.sliderModal.showModal.get(),
        formRef: taxGroupSliderFormRef,
        mode: sectionState.sliderModal.mode.get(),
        isPageOnStandby: sectionState.taxBracketSlider.showModal.get(),
        prefillData: sectionState.sliderModal.prefillData.get(),
        onClose: handleOnCloseTaxGroupSlider,
        onCreateTaxBracket: handleOnCreateTaxBracket,
        onSubmit: onSubmitTaxGroupSlider,
        taxBracketSliderProps,
        allTaxBrackets: rawClone(allTaxBrackets),
        level: 1,
    };

    // draw
    return <TaxGroupSlider {...taxGroupSliderProps} />;
};
