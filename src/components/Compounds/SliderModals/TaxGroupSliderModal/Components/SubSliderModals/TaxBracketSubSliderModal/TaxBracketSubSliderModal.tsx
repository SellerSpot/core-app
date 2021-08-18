import { State } from '@hookstate/core';
import { ISelectOption } from '@sellerspot/universal-components';
import { TaxBracketSliderModal } from 'components/Compounds/SliderModals/TaxBracketSliderModal/TaxBracketSliderModal';
import { TaxBracketSliderModalService } from 'components/Compounds/SliderModals/TaxBracketSliderModal/TaxBracketSliderModal.service';
import { ITaxBracketSliderModalProps } from 'components/Compounds/SliderModals/TaxBracketSliderModal/TaxBracketSliderModal.types';
import { TaxGroupSliderModalService } from 'components/Compounds/SliderModals/TaxGroupSliderModal/TaxGroupSliderModal.service';
import {
    ITaxGroupSliderModalProps,
    ITaxGroupSliderModalSubSliderModalState,
} from 'components/Compounds/SliderModals/TaxGroupSliderModal/TaxGroupSliderModal.types';
import React, { ReactElement, useRef } from 'react';

type ITaxBracketSubSliderModalProps = {
    taxBracketSliderModalState: State<
        ITaxGroupSliderModalSubSliderModalState['taxBracketSliderModal']
    >;
    taxGroupSliderModalFormRef: ITaxGroupSliderModalProps['formRef'];
    postTaxBracketCreation: ITaxGroupSliderModalProps['postTaxBracketCreation'];
};

export const TaxBracketSubSliderModal = (props: ITaxBracketSubSliderModalProps): ReactElement => {
    // props
    const { taxBracketSliderModalState, taxGroupSliderModalFormRef, postTaxBracketCreation } =
        props;

    // hooks
    const formRef: ITaxBracketSliderModalProps['formRef'] = useRef(null);

    // handlers
    const onCloseHandler: ITaxBracketSliderModalProps['onClose'] = async (props) => {
        await TaxBracketSliderModalService.handleOnCloseTaxBracketSliderModal({
            onCloseProps: props,
            sliderModalState: {
                showModal: taxBracketSliderModalState.showModal,
            },
        });
    };
    const onSubmitHandler: ITaxBracketSliderModalProps['onSubmit'] = async ({ values }) => {
        // creating bracket
        const createdBracket = await TaxBracketSliderModalService.createNewTaxBracket(values);
        // holds the list of selected tax brackets
        let selectedTaxBrackets: ISelectOption<number>[] = [];

        // updating the tax group form
        const newBracket = TaxGroupSliderModalService.convertTaxBracketDataToISelectOption({
            brackets: [createdBracket],
        });
        // getting already present brackets
        const existingBrackets = taxGroupSliderModalFormRef.current.getFieldState('bracket').value;
        // add existing brackets if they are present
        if (existingBrackets.length) {
            selectedTaxBrackets = [...existingBrackets];
        }
        selectedTaxBrackets.push(newBracket[0]);
        // setting form value
        taxGroupSliderModalFormRef.current.change('bracket', selectedTaxBrackets);
        taxBracketSliderModalState.showModal.set(false);
        // calling any post hooks
        postTaxBracketCreation?.();
    };

    // modal props
    const taxBracketSliderModalProps: ITaxBracketSliderModalProps = {
        formRef: formRef,
        level: 2,
        mode: taxBracketSliderModalState.mode.get(),
        onClose: onCloseHandler,
        onSubmit: onSubmitHandler,
        showModal: taxBracketSliderModalState.showModal.get(),
        prefillData: taxBracketSliderModalState.prefillData.get(),
    };

    // draw
    return <TaxBracketSliderModal {...taxBracketSliderModalProps} />;
};
