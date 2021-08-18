import { State } from '@hookstate/core';
import { ProductSliderModalFieldsService } from 'components/Compounds/SliderModals/ProductSliderModal/Components/ModalBody/Components/Fields.service';
import {
    IProductSliderModalProps,
    IProductSliderModalSubSliderModalState,
} from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.types';
import { StockUnitSliderModal } from 'components/Compounds/SliderModals/StockUnitSliderModal/StockUnitSliderModal';
import { StockUnitSliderModalService } from 'components/Compounds/SliderModals/StockUnitSliderModal/StockUnitSliderModal.service';
import { IStockUnitSliderModalProps } from 'components/Compounds/SliderModals/StockUnitSliderModal/StockUnitSliderModal.types';
import React, { ReactElement, useRef } from 'react';

interface IStockUnitSubSliderModalProps {
    sliderModalState: State<IProductSliderModalSubSliderModalState['stockUnitSliderModal']>;
    productSliderModalFormRef: IProductSliderModalProps['formRef'];
}

export const StockUnitSubSliderModal = (props: IStockUnitSubSliderModalProps): ReactElement => {
    // props
    const { productSliderModalFormRef, sliderModalState } = props;

    // hooks
    const formRef: IStockUnitSliderModalProps['formRef'] = useRef(null);

    // handlers
    const onCloseHandler: IStockUnitSliderModalProps['onClose'] = (props) => {
        StockUnitSliderModalService.handleOnCloseStockUnitSliderModal({
            onCloseProps: props,
            sliderModalState,
        });
    };
    const onSubmitHandler: IStockUnitSliderModalProps['onSubmit'] = async ({ values }) => {
        const newStockUnit = await StockUnitSliderModalService.createNewStockUnit(values);
        const newStockUnitOption =
            ProductSliderModalFieldsService.formatStockUnitDataForSelectComponent(newStockUnit);

        // updating form
        productSliderModalFormRef.current.change('stockUnit', newStockUnitOption);
        sliderModalState.showModal.set(false);
    };

    // stock unit slider modal props
    const stockUnitSliderModalProps: IStockUnitSliderModalProps = {
        formRef,
        level: 2,
        showModal: sliderModalState.showModal.get(),
        mode: sliderModalState.mode.get(),
        prefillData: sliderModalState.prefillData.get(),
        onClose: onCloseHandler,
        onSubmit: onSubmitHandler,
    };

    // draw
    return <StockUnitSliderModal {...stockUnitSliderModalProps} />;
};
