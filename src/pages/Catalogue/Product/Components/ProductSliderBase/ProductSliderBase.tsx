import { ProductSlider } from 'components/Compounds/SliderModals/ProductSlider/ProductSlider';
import { IProductSliderProps } from 'components/Compounds/SliderModals/ProductSlider/ProductSlider.types';
import React, { ReactElement, useRef } from 'react';

export const ProductSliderBase = (): ReactElement => {
    // refs
    const productFormRef: IProductSliderProps['formRef'] = useRef(null);

    // compiling data
    const productSliderProps: IProductSliderProps = {
        formRef: productFormRef,
        level: 1,
        mode: 'create',
        onClose: () => null,
        onSubmit: () => null,
        showModal: false,
        prefillData: null,
        brandSliderProps: null,
        categorySliderProps: null,
        stockUnitSliderProps: null,
        taxBracketSliderProps: null,
        taxGroupSliderProps: null,
    };

    // draw
    return <ProductSlider {...productSliderProps} />;
};
