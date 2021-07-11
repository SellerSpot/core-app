import { State } from '@hookstate/core';
import { StockUnitSlider } from 'components/Compounds/SliderModals/StockUnitSlider/StockUnitSlider';
import { IStockUnitSliderProps } from 'components/Compounds/SliderModals/StockUnitSlider/StockUnitSlider.types';
import React, { ReactElement, useRef } from 'react';
import { IStockUnitPageState } from '../../StockUnit.types';

interface IStockUnitSliderBaseProps {
    sliderState: State<IStockUnitPageState['sliderModal']>;
}

export const StockUnitSliderBase = (props: IStockUnitSliderBaseProps): ReactElement => {
    // props
    const { sliderState } = props;

    // refs
    const stockUnitSliderFormRef: IStockUnitSliderProps['formRef'] = useRef(null);

    // handlers
    const onCloseHander: IStockUnitSliderProps['onClose'] = () => {
        sliderState.showModal.set(false);
    };
    const onSubmitHandler: IStockUnitSliderProps['onSubmit'] = async () => {
        console.log('Submitted');
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
