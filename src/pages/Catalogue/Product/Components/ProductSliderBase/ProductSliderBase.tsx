import { State } from '@hookstate/core';
import { ProductSlider } from 'components/Compounds/SliderModals/ProductSlider/ProductSlider';
import { IProductSliderProps } from 'components/Compounds/SliderModals/ProductSlider/ProductSlider.types';
import React, { ReactElement, useRef } from 'react';
import { IProductPageState } from '../../Product.types';

interface IProductSliderBaseProps {
    sliderState: State<IProductPageState['sliderModal']>;
}

export const ProductSliderBase = (props: IProductSliderBaseProps): ReactElement => {
    // props
    const { sliderState } = props;

    // refs
    const productFormRef: IProductSliderProps['formRef'] = useRef(null);

    // handlers
    const productSliderOnClose: IProductSliderProps['onClose'] = () => {
        sliderState.showModal.set(false);
    };

    // compiling data
    const productSliderProps: IProductSliderProps = {
        showModal: sliderState.showModal.get(),
        formRef: productFormRef,
        mode: sliderState.mode.get(),
        prefillData: sliderState.prefillData.get(),
        level: 1,
        onClose: productSliderOnClose,
        onSubmit: () => null,
        brandSliderProps: null,
        categorySliderProps: null,
        stockUnitSliderProps: null,
        taxBracketSliderProps: null,
        taxGroupSliderProps: null,
    };

    // draw
    return <ProductSlider {...productSliderProps} />;
};
