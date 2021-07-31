import { State } from '@hookstate/core';
import { StockUnitSliderModal } from 'components/Compounds/SliderModals/StockUnitSliderModal/StockUnitSliderModal';
import { StockUnitSliderModalService } from 'components/Compounds/SliderModals/StockUnitSliderModal/StockUnitSliderModal.service';
import { IStockUnitSliderModalProps } from 'components/Compounds/SliderModals/StockUnitSliderModal/StockUnitSliderModal.types';
import React, { ReactElement, useRef } from 'react';
import { IStockUnitPageState } from '../../StockUnit.types';

interface IStockUnitSliderBaseProps {
    sliderModalState: State<IStockUnitPageState['sliderModal']>;
    getAllStockUnit: () => Promise<void>;
}

export const StockUnitSliderBase = (props: IStockUnitSliderBaseProps): ReactElement => {
    // props
    const { sliderModalState, getAllStockUnit } = props;

    // refs
    const stockUnitSliderFormRef: IStockUnitSliderModalProps['formRef'] = useRef(null);

    // handlers
    const onCloseHander: IStockUnitSliderModalProps['onClose'] = async (props) => {
        await StockUnitSliderModalService.handleOnCloseStockUnitSliderModal({
            onCloseProps: props,
            sliderModalState: {
                showModal: sliderModalState.showModal,
            },
        });
    };
    const onSubmitHandler: IStockUnitSliderModalProps['onSubmit'] = async ({ values }) => {
        // values
        const { name, unit } = values;
        // compute
        if (sliderModalState.mode.get() === 'create') {
            await StockUnitSliderModalService.createNewStockUnit({
                name,
                unit,
            });
        } else {
            await StockUnitSliderModalService.editStockUnit({
                id: sliderModalState.prefillData.id.get(),
                name,
                unit,
            });
        }

        // finishing up
        sliderModalState.showModal.set(false);
        getAllStockUnit();
    };

    // compiling data
    const stockUnitSliderModalProps: IStockUnitSliderModalProps = {
        showModal: sliderModalState.showModal.get(),
        prefillData: sliderModalState.prefillData.get(),
        mode: sliderModalState.mode.get(),
        level: 1,
        formRef: stockUnitSliderFormRef,
        onClose: onCloseHander,
        onSubmit: onSubmitHandler,
    };

    // draw
    return <StockUnitSliderModal {...stockUnitSliderModalProps} />;
};
