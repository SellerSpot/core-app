import { State } from '@hookstate/core';
import { StockUnitSlider } from 'components/Compounds/SliderModals/StockUnitSlider/StockUnitSlider';
import { StockUnitSliderService } from 'components/Compounds/SliderModals/StockUnitSlider/StockUnitSlider.service';
import { IStockUnitSliderProps } from 'components/Compounds/SliderModals/StockUnitSlider/StockUnitSlider.types';
import React, { ReactElement, useRef } from 'react';
import { IStockUnitPageState } from '../../StockUnit.types';
import { StockUnitSliderBaseService } from './StockUnitSliderBase.service';

interface IStockUnitSliderBaseProps {
    sliderState: State<IStockUnitPageState['sliderModal']>;
    getAllStockUnit: () => Promise<void>;
}

export const StockUnitSliderBase = (props: IStockUnitSliderBaseProps): ReactElement => {
    // props
    const { sliderState, getAllStockUnit } = props;

    // refs
    const stockUnitSliderFormRef: IStockUnitSliderProps['formRef'] = useRef(null);

    // handlers
    const onCloseHander: IStockUnitSliderProps['onClose'] = async (props) => {
        await StockUnitSliderService.handleOnCloseStockUnitSliderModal({
            onCloseProps: props,
            sliderState: {
                showModal: sliderState.showModal,
            },
        });
    };
    const onSubmitHandler: IStockUnitSliderProps['onSubmit'] = async ({ values }) => {
        // values
        const { name, unit } = values;
        // compute
        if (sliderState.mode.get() === 'create') {
            await StockUnitSliderBaseService.createNewStockUnit({
                name,
                unit,
            });
        } else {
            await StockUnitSliderBaseService.editStockUnit({
                id: sliderState.prefillData.id.get(),
                name,
                unit,
            });
        }

        // finishing up
        sliderState.showModal.set(false);
        getAllStockUnit();
    };

    // compiling data
    const stockUnitSliderProps: IStockUnitSliderProps = {
        showModal: sliderState.showModal.get(),
        prefillData: sliderState.prefillData.get(),
        mode: sliderState.mode.get(),
        level: 1,
        formRef: stockUnitSliderFormRef,
        onClose: onCloseHander,
        onSubmit: onSubmitHandler,
    };

    // draw
    return <StockUnitSlider {...stockUnitSliderProps} />;
};
