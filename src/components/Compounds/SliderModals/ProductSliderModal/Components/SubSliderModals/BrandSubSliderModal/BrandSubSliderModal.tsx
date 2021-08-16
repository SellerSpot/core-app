import { State } from '@hookstate/core';
import { BrandSliderModal } from 'components/Compounds/SliderModals/BrandSliderModal/BrandSliderModal';
import { BrandSliderModalService } from 'components/Compounds/SliderModals/BrandSliderModal/BrandSliderModal.service';
import { IBrandSliderModalProps } from 'components/Compounds/SliderModals/BrandSliderModal/BrandSliderModal.types';
import { ProductSliderModalFieldsService } from 'components/Compounds/SliderModals/ProductSliderModal/Components/ModalBody/Components/Fields.service';
import {
    IProductSliderModalProps,
    IProductSliderModalSubSliderModalState,
} from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.types';
import React, { ReactElement } from 'react';
import { useRef } from 'react';

interface IBrandSubSliderModalProps {
    sliderModalState: State<IProductSliderModalSubSliderModalState['brandSliderModal']>;
    productSliderModalFormRef: IProductSliderModalProps['formRef'];
}

export const BrandSubSliderModal = (props: IBrandSubSliderModalProps): ReactElement => {
    // props
    const { sliderModalState, productSliderModalFormRef } = props;

    // hooks
    const formRef: IBrandSliderModalProps['formRef'] = useRef(null);

    // handlers
    const onCloseHandler: IBrandSliderModalProps['onClose'] = async (props) => {
        await BrandSliderModalService.handleOnCloseBrandSliderModal({
            onCloseProps: props,
            sliderModalState,
        });
    };
    const onSubmitHandler: IBrandSliderModalProps['onSubmit'] = async ({ values }) => {
        // requesting
        const createdBrand = await BrandSliderModalService.createNewBrand(values);
        // converting to ISelectOption
        const createdOption =
            ProductSliderModalFieldsService.formatBrandDataForSelectComponent(createdBrand);
        // updating form
        productSliderModalFormRef.current.change('brand', createdOption);
        sliderModalState.showModal.set(false);
    };

    // brand slider modal props
    const brandSliderModalProps: IBrandSliderModalProps = {
        formRef,
        level: 2,
        mode: sliderModalState.mode.get(),
        showModal: sliderModalState.showModal.get(),
        prefillData: sliderModalState.prefillData.get(),
        onSubmit: onSubmitHandler,
        onClose: onCloseHandler,
    };

    // draw
    return <BrandSliderModal {...brandSliderModalProps} />;
};
