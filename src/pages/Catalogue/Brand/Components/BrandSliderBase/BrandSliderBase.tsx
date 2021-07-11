import { State } from '@hookstate/core';
import { BrandSlider } from 'components/Compounds/SliderModals/BrandSlider/BrandSlider';
import { IBrandSliderProps } from 'components/Compounds/SliderModals/BrandSlider/BrandSlider.types';
import React, { ReactElement, useRef } from 'react';
import { IBrandPageState } from '../../Brand.types';
import { BrandSliderBaseService } from './BrandSliderBase.service';

interface IBrandSliderBaseProps {
    pageState: State<IBrandPageState>;
    getAllBrand: () => Promise<void>;
}

export const BrandSliderBase = (props: IBrandSliderBaseProps): ReactElement => {
    // props
    const { pageState, getAllBrand } = props;

    // refs
    const taxBracketSliderFormRef: IBrandSliderProps['formRef'] = useRef(null);

    // handlers
    const onSubmitHandler: IBrandSliderProps['onSubmit'] = async ({ values }) => {
        if (pageState.sliderModal.mode.get() === 'create') {
            await BrandSliderBaseService.createNewBrand(values);
        } else {
            await BrandSliderBaseService.editBrand({
                id: pageState.sliderModal.prefillData.id.get(),
                name: values.name,
            });
        }
        await getAllBrand();
        pageState.sliderModal.showModal.set(false);
    };
    const onCloseHandler: IBrandSliderProps['onClose'] = () => {
        pageState.sliderModal.showModal.set(false);
    };

    // compile data
    const brandSliderProps: IBrandSliderProps = {
        showModal: pageState.sliderModal.showModal.get(),
        mode: pageState.sliderModal.mode.get(),
        prefillData: pageState.sliderModal.prefillData.get(),
        formRef: taxBracketSliderFormRef,
        onSubmit: onSubmitHandler,
        onClose: onCloseHandler,
        level: 1,
    };

    // draw
    return <BrandSlider {...brandSliderProps} />;
};
