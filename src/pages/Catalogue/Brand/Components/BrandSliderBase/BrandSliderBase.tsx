import { State } from '@hookstate/core';
import { BrandSliderModal } from 'components/Compounds/SliderModals/BrandSliderModal/BrandSliderModal';
import { BrandSliderModalService } from 'components/Compounds/SliderModals/BrandSliderModal/BrandSliderModal.service';
import { IBrandSliderModalProps } from 'components/Compounds/SliderModals/BrandSliderModal/BrandSliderModal.types';
import React, { ReactElement, useRef } from 'react';
import { IBrandPageState } from '../../Brand.types';

interface IBrandSliderBaseProps {
    sliderModalState: State<IBrandPageState['sliderModal']>;
    getAllBrand: () => Promise<void>;
}

export const BrandSliderBase = (props: IBrandSliderBaseProps): ReactElement => {
    // props
    const { sliderModalState, getAllBrand } = props;

    // refs
    const taxBracketSliderFormRef: IBrandSliderModalProps['formRef'] = useRef(null);

    // handlers
    const onSubmitHandler: IBrandSliderModalProps['onSubmit'] = async ({ values }) => {
        if (sliderModalState.mode.get() === 'create') {
            await BrandSliderModalService.createNewBrand(values);
        } else {
            await BrandSliderModalService.editBrand({
                id: sliderModalState.prefillData.id.get(),
                name: values.name,
            });
        }
        await getAllBrand();
        sliderModalState.showModal.set(false);
    };
    const onCloseHandler: IBrandSliderModalProps['onClose'] = (props) => {
        BrandSliderModalService.handleOnCloseBrandSliderModal({
            onCloseProps: props,
            sliderModalState: {
                showModal: sliderModalState.showModal,
            },
        });
    };

    // compile data
    const brandSliderModalProps: IBrandSliderModalProps = {
        showModal: sliderModalState.showModal.get(),
        mode: sliderModalState.mode.get(),
        prefillData: sliderModalState.prefillData.get(),
        formRef: taxBracketSliderFormRef,
        onSubmit: onSubmitHandler,
        onClose: onCloseHandler,
        level: 1,
    };

    // draw
    return <BrandSliderModal {...brandSliderModalProps} />;
};
