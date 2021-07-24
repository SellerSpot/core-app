import { State } from '@hookstate/core';
import { CategorySlider } from 'components/Compounds/SliderModals/CategorySlider/CategorySlider';
import { ICategorySliderProps } from 'components/Compounds/SliderModals/CategorySlider/CategorySlider.types';
import React, { ReactElement, useRef } from 'react';
import { ICategoryPageState } from '../../Category.types';

interface ICategorySliderModalBaseProps {
    sliderState: State<ICategoryPageState['sliderModal']>;
    getAllCategories: () => Promise<void>;
}

export const CategorySliderModalBase = (props: ICategorySliderModalBaseProps): ReactElement => {
    // props
    const { sliderState } = props;

    // refs
    const categorySliderFormRef: ICategorySliderProps['formRef'] = useRef(null);

    // handler
    const onCloseHandler: ICategorySliderProps['onClose'] = () => {
        sliderState.showModal.set(false);
    };
    const onSubmitHandler: ICategorySliderProps['onSubmit'] = async () => {
        console.log('Slider Modal onSubmit');
    };

    // compile data
    const categorySliderProps: ICategorySliderProps = {
        showModal: sliderState.showModal.get(),
        formRef: categorySliderFormRef,
        level: 1,
        mode: sliderState.mode.get(),
        prefillData: sliderState.prefillData.get(),
        onClose: onCloseHandler,
        onSubmit: onSubmitHandler,
    };

    // draw
    return <CategorySlider {...categorySliderProps} />;
};
