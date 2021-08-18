import { State } from '@hookstate/core';
import { InventoryModalSearchFieldService } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/SearchField/SearchField.service';
import {
    IInventorySliderModalState,
    IInventorySliderModalSubSliderModalState,
    ISearchInventorySelectMeta,
} from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';
import { ProductSliderModal } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal';
import { ProductSliderModalService } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.service';
import { IProductSliderModalProps } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.types';
import React, { ReactElement, useRef } from 'react';
import { ISelectOption } from '@sellerspot/universal-components';

interface IProductSubSliderModalProps {
    sliderModalState: State<IInventorySliderModalSubSliderModalState['productSliderModal']>;
    inventorySliderModalState: State<IInventorySliderModalState>;
    onAddProductToInventoryHandler: (options: ISelectOption<ISearchInventorySelectMeta>) => void;
}

export const ProductSubSliderModal = (props: IProductSubSliderModalProps): ReactElement => {
    // props
    const { sliderModalState, inventorySliderModalState, onAddProductToInventoryHandler } = props;

    const formRef: IProductSliderModalProps['formRef'] = useRef(null);

    // handlers
    const onCloseHandler: IProductSliderModalProps['onClose'] = (props) => {
        ProductSliderModalService.handleOnCloseProductSliderModal({
            onCloseProps: props,
            sliderModalState,
        });
    };
    const onSubmitHandler: IProductSliderModalProps['onSubmit'] = async ({ values }) => {
        const newProduct = await ProductSliderModalService.createNewProduct(values);
        const newProductOption =
            InventoryModalSearchFieldService.convertIProductDataToISelectOption(newProduct);
        // updating the search field (using state since it is not part of form)
        inventorySliderModalState.merge({
            searchOption: newProductOption,
        });
        onAddProductToInventoryHandler({
            label: newProduct.name,
            value: newProduct.id,
        });
        sliderModalState.showModal.set(false);
    };

    // product slider modal props
    const productSliderModalProps: IProductSliderModalProps = {
        formRef,
        showModal: sliderModalState.showModal.get(),
        mode: sliderModalState.mode.get(),
        prefillData: sliderModalState.prefillData.get(),
        level: 2,
        onClose: onCloseHandler,
        onSubmit: onSubmitHandler,
    };

    // draw
    return <ProductSliderModal {...productSliderModalProps} />;
};
