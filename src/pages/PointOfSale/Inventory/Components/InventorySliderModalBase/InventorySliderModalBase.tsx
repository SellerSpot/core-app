import {
    ISearchInventorySelectMeta,
    InventorySliderModal,
} from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal';
import { IInventorySliderModalProps } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';
import React, { ReactElement, useRef } from 'react';
import { State, useState } from '@hookstate/core';
import { ISelectOption } from '@sellerspot/universal-components';
import { IInventoryPageState } from '../../Inventory.types';

interface IInventorySliderModalBaseProps {
    sliderModalState: State<IInventoryPageState['sliderModal']>;
}

export const InventorySliderModalBase = (props: IInventorySliderModalBaseProps): ReactElement => {
    // props
    const { sliderModalState } = props;

    // state
    const localSliderModalState = useState(sliderModalState);
    const searchFieldValue = useState<ISelectOption<ISearchInventorySelectMeta>>(null);

    // refs
    const inventoryFormRef: IInventorySliderModalProps['formRef'] = useRef(null);

    // handlers
    const onCloseHandler: IInventorySliderModalProps['onClose'] = (props) => {
        // props
        const {} = props;
        localSliderModalState.showModal.set(false);
    };
    const onAddProductToInventoryHandler: IInventorySliderModalProps['onAddProductToInventory'] = (
        props,
    ) => {
        // props
        const { label } = props;
        // settting search field value
        props.label = label.replace(`Add product "`, '').replace(`" to inventory`, '');
        searchFieldValue.set(props);
        // fetching relevant inventory data from server
    };

    // slider modal props
    const inventorySliderModalProps: IInventorySliderModalProps = {
        formRef: inventoryFormRef,
        mode: localSliderModalState.mode.get(),
        prefillData: localSliderModalState.prefillData.get(),
        showModal: localSliderModalState.showModal.get(),
        allOutlets: localSliderModalState.allOutlets.get(),
        onClose: onCloseHandler,
        onCreateProduct: null,
        onSubmit: null,
        onAddProductToInventory: onAddProductToInventoryHandler,
        isLoadingBody: false,
        onSelectInventoryProduct: null,
        searchValue: searchFieldValue.get(),
        productSliderModalProps: null,
        taxBracketSliderModalProps: null,
        taxGroupSliderModalProps: null,
    };

    // draw
    return <InventorySliderModal {...inventorySliderModalProps} />;
};
