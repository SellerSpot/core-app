import { State, useState } from '@hookstate/core';
import { InventorySliderModal } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal';
import { IInventorySliderModalProps } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';
import React, { ReactElement, useRef } from 'react';
import { IInventoryPageState } from '../../Inventory.types';
import { IAddProductToInventoryRequest } from '@sellerspot/universal-types';
import { InventorySliderModalService } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.service';

interface IInventorySliderModalBaseProps {
    sliderModalState: State<IInventoryPageState['sliderModal']>;
    getAllInventoryProducts: () => Promise<void>;
}

export const InventorySliderModalBase = (props: IInventorySliderModalBaseProps): ReactElement => {
    // props
    const { sliderModalState, getAllInventoryProducts } = props;

    // state
    const localSliderModalState = useState(sliderModalState);

    // refs
    const inventoryFormRef: IInventorySliderModalProps['formRef'] = useRef(null);

    // handlers
    const onCloseHandler: IInventorySliderModalProps['onClose'] = () => {
        // props
        localSliderModalState.showModal.set(false);
    };
    const onSubmitHandler: IInventorySliderModalProps['onSubmit'] = async (values) => {
        const { currentProduct, formValues, mode } = values;
        // structuring and compiling data in request format
        const requestObject: IAddProductToInventoryRequest = {
            productId: currentProduct.id,
            outlets: Object.keys(formValues).map((outletId) => {
                const {
                    isActive,
                    isTrack,
                    landingCost,
                    markup,
                    mrp,
                    sellingPrice,
                    stock,
                    taxBracket,
                } = formValues[outletId];
                return {
                    isActive,
                    isTrack,
                    landingCost,
                    markup,
                    mrp,
                    outlet: outletId,
                    sellingPrice,
                    stock,
                    taxBracket: taxBracket.value,
                };
            }),
        };
        // sending request
        if (mode === 'edit') {
            await InventorySliderModalService.editProductInInventory(requestObject);
        } else {
            await InventorySliderModalService.addProductToInventory(requestObject);
        }
        await getAllInventoryProducts();
        localSliderModalState.showModal.set(false);
    };

    // slider modal props
    const inventorySliderModalProps: IInventorySliderModalProps = {
        formRef: inventoryFormRef,
        prefillData: localSliderModalState.prefillData.get(),
        showModal: localSliderModalState.showModal.get(),
        onClose: onCloseHandler,
        onSubmit: onSubmitHandler,
    };

    // draw
    return <InventorySliderModal {...inventorySliderModalProps} />;
};
