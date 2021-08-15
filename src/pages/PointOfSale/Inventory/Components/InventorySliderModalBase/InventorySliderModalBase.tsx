import { State, useState } from '@hookstate/core';
import { InventorySliderModal } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal';
import { IInventorySliderModalProps } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';
import React, { ReactElement, useRef } from 'react';
import { IInventoryPageState } from '../../Inventory.types';

interface IInventorySliderModalBaseProps {
    sliderModalState: State<IInventoryPageState['sliderModal']>;
}

export const InventorySliderModalBase = (props: IInventorySliderModalBaseProps): ReactElement => {
    // props
    const { sliderModalState } = props;

    // state
    const localSliderModalState = useState(sliderModalState);

    // refs
    const inventoryFormRef: IInventorySliderModalProps['formRef'] = useRef(null);

    // handlers
    const onCloseHandler: IInventorySliderModalProps['onClose'] = (props) => {
        // props
        const {} = props;
        localSliderModalState.showModal.set(false);
    };

    // slider modal props
    const inventorySliderModalProps: IInventorySliderModalProps = {
        formRef: inventoryFormRef,
        mode: localSliderModalState.mode.get(),
        prefillData: localSliderModalState.prefillData.get(),
        showModal: localSliderModalState.showModal.get(),
        allOutlets: localSliderModalState.allOutlets.get(),
        productSliderModalProps: null,
        onClose: onCloseHandler,
        onCreateProduct: null,
        onSubmit: null,
    };

    // draw
    return <InventorySliderModal {...inventorySliderModalProps} />;
};
