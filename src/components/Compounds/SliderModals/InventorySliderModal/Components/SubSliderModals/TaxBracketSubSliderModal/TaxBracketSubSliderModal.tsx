import { State } from '@hookstate/core';
import { FieldsService } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/ExpandingPanels/Components/DetailsContentView/Components/Fields.service';
import {
    IInventorySliderModalFormFields,
    IInventorySliderModalProps,
    IInventorySliderModalState,
    IInventorySliderModalSubSliderModalState,
} from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';
import { TaxBracketSliderModal } from 'components/Compounds/SliderModals/TaxBracketSliderModal/TaxBracketSliderModal';
import { TaxBracketSliderModalService } from 'components/Compounds/SliderModals/TaxBracketSliderModal/TaxBracketSliderModal.service';
import { ITaxBracketSliderModalProps } from 'components/Compounds/SliderModals/TaxBracketSliderModal/TaxBracketSliderModal.types';
import { FieldState } from 'final-form';
import React, { ReactElement, useRef } from 'react';

interface ITaxBracketSubSliderModalProps {
    sliderModalState: State<IInventorySliderModalSubSliderModalState['taxBracketSliderModal']>;
    inventorySliderModalState: State<IInventorySliderModalState>;
    inventorySliderModalFormRef: IInventorySliderModalProps['formRef'];
}

export const TaxBracketSubSliderModal = (props: ITaxBracketSubSliderModalProps): ReactElement => {
    // props
    const { sliderModalState, inventorySliderModalFormRef, inventorySliderModalState } = props;

    // hooks
    const formRef: ITaxBracketSliderModalProps['formRef'] = useRef(null);

    // handlers
    const onCloseHandler: ITaxBracketSliderModalProps['onClose'] = (props) => {
        TaxBracketSliderModalService.handleOnCloseTaxBracketSliderModal({
            onCloseProps: props,
            sliderModalState,
        });
    };
    const onSubmitHandler: ITaxBracketSliderModalProps['onSubmit'] = async ({ values }) => {
        // request
        const newTaxBracket = await TaxBracketSliderModalService.createNewTaxBracket(values);
        // getting outlet to updated tax bracket data for
        const currentOutlet = inventorySliderModalState.focussedOutletId.get();
        // getting field state for tax bracket field
        const fieldState = inventorySliderModalFormRef.current.getFieldState(
            `${currentOutlet}.taxBracket`,
        ) as FieldState<IInventorySliderModalFormFields['taxBracket']>;
        // updating field values with new tax bracket
        fieldState.change(FieldsService.convertITaxBracketDataToISelect(newTaxBracket));
        sliderModalState.showModal.set(false);
    };

    // tax bracket slider modal props
    const taxBracketSliderModalProps: ITaxBracketSliderModalProps = {
        formRef,
        showModal: sliderModalState.showModal.get(),
        mode: sliderModalState.mode.get(),
        prefillData: sliderModalState.prefillData.get(),
        level: 2,
        onClose: onCloseHandler,
        onSubmit: onSubmitHandler,
    };

    // draw
    return <TaxBracketSliderModal {...taxBracketSliderModalProps} />;
};
