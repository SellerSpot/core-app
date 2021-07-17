import { CategorySlider } from 'components/Compounds/SliderModals/CategorySlider/CategorySlider';
import { ICategorySliderProps } from 'components/Compounds/SliderModals/CategorySlider/CategorySlider.types';
import React, { ReactElement, useRef } from 'react';

export const CategorySliderModalBase = (): ReactElement => {
    // refs
    const categorySliderModalFormRef: ICategorySliderProps['formRef'] = useRef(null);

    // handlers
    // const onCloseSliderModal: ICategorySliderProps['onClose'] = () => {};

    // compile data
    const categorySliderModalProps: ICategorySliderProps = {
        formRef: categorySliderModalFormRef,
        showModal: false,
        prefillData: null,
        onSubmit: null,
        level: 1,
        mode: 'create',
        onClose: null,
    };

    return <CategorySlider {...categorySliderModalProps} />;
};
