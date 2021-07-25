import { State } from '@hookstate/core';
import { BrandSlider } from 'components/Compounds/SliderModals/BrandSlider/BrandSlider';
import { BrandSliderService } from 'components/Compounds/SliderModals/BrandSlider/BrandSlider.service';
import { IBrandSliderProps } from 'components/Compounds/SliderModals/BrandSlider/BrandSlider.types';
import React, { ReactElement, useRef } from 'react';
import { IBrandPageState } from '../../Brand.types';
import { BrandSliderBaseService } from './BrandSliderBase.service';

interface IBrandSliderBaseProps {
    sliderState: State<IBrandPageState['sliderModal']>;
    getAllBrand: () => Promise<void>;
}

export const BrandSliderBase = (props: IBrandSliderBaseProps): ReactElement => {
    // props
    const { sliderState, getAllBrand } = props;

    // refs
    const taxBracketSliderFormRef: IBrandSliderProps['formRef'] = useRef(null);

    // handlers
    const onSubmitHandler: IBrandSliderProps['onSubmit'] = async ({ values }) => {
        if (sliderState.mode.get() === 'create') {
            await BrandSliderBaseService.createNewBrand(values);
        } else {
            await BrandSliderBaseService.editBrand({
                id: sliderState.prefillData.id.get(),
                name: values.name,
            });
        }
        await getAllBrand();
        sliderState.showModal.set(false);
    };
    const onCloseHandler: IBrandSliderProps['onClose'] = (props) => {
        BrandSliderService.handleOnCloseBrandSliderModal({
            onCloseProps: props,
            sliderState: {
                showModal: sliderState.showModal,
            },
        });
    };

    // compile data
    const brandSliderProps: IBrandSliderProps = {
        showModal: sliderState.showModal.get(),
        mode: sliderState.mode.get(),
        prefillData: sliderState.prefillData.get(),
        formRef: taxBracketSliderFormRef,
        onSubmit: onSubmitHandler,
        onClose: onCloseHandler,
        level: 1,
    };

    // draw
    return <BrandSlider {...brandSliderProps} />;
};
