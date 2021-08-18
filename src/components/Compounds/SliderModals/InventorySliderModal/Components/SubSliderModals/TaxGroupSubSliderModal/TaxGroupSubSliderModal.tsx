import { State } from '@hookstate/core';
import { FieldsService } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/ExpandingPanels/Components/DetailsContentView/Components/Fields.service';
import {
    IInventorySliderModalFormFields,
    IInventorySliderModalProps,
    IInventorySliderModalState,
    IInventorySliderModalSubSliderModalState,
} from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';
import { TaxGroupSliderModal } from 'components/Compounds/SliderModals/TaxGroupSliderModal/TaxGroupSliderModal';
import { TaxGroupSliderModalService } from 'components/Compounds/SliderModals/TaxGroupSliderModal/TaxGroupSliderModal.service';
import { ITaxGroupSliderModalProps } from 'components/Compounds/SliderModals/TaxGroupSliderModal/TaxGroupSliderModal.types';
import { FieldState } from 'final-form';
import React, { ReactElement, useRef } from 'react';

interface ITaxGroupSubSliderModalProps {
    sliderModalState: State<IInventorySliderModalSubSliderModalState['taxGroupSliderModal']>;
    inventorySliderModalState: State<IInventorySliderModalState>;
    inventorySliderModalFormRef: IInventorySliderModalProps['formRef'];
}

export const TaxGroupSubSliderModal = (props: ITaxGroupSubSliderModalProps): ReactElement => {
    // props
    const { sliderModalState, inventorySliderModalFormRef, inventorySliderModalState } = props;

    // hooks
    const formRef: ITaxGroupSliderModalProps['formRef'] = useRef(null);

    // handlers
    const onCloseHandler: ITaxGroupSliderModalProps['onClose'] = (props) => {
        TaxGroupSliderModalService.handleOnCloseTaxGroupSliderModal({
            onCloseProps: props,
            sliderModalState,
        });
    };
    const onSubmitHandler: ITaxGroupSliderModalProps['onSubmit'] = async ({ values }) => {
        // request
        const newTaxGroup = await TaxGroupSliderModalService.createNewTaxGroup(values);
        // getting outlet to updated tax bracket data for
        const currentOutlet = inventorySliderModalState.focussedOutletId.get();
        // getting field state for tax bracket field
        const fieldState = inventorySliderModalFormRef.current.getFieldState(
            `${currentOutlet}.taxBracket`,
        ) as FieldState<IInventorySliderModalFormFields['taxBracket']>;
        // updating field values with new tax bracket
        fieldState.change(FieldsService.convertITaxBracketDataToISelect(newTaxGroup));
        sliderModalState.showModal.set(false);
    };

    // tax bracket slider modal props
    const taxGroupSliderModalProps: ITaxGroupSliderModalProps = {
        formRef,
        showModal: sliderModalState.showModal.get(),
        mode: sliderModalState.mode.get(),
        prefillData: sliderModalState.prefillData.get(),
        level: 2,
        onClose: onCloseHandler,
        onSubmit: onSubmitHandler,
    };

    // draw
    return <TaxGroupSliderModal {...taxGroupSliderModalProps} />;
};
