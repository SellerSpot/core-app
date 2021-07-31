import {
    ISliderModalProps,
    SliderModal,
    SliderModalLayoutWrapper,
} from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { Form } from 'react-final-form';
import { rawClone } from 'utilities/general';
import { BrandSliderModal } from '../BrandSliderModal/BrandSliderModal';
import { SelectCategorySliderModal } from '../SelectCategorySliderModal/SelectCategorySliderModal';
import { StockUnitSliderModal } from '../StockUnitSliderModal/StockUnitSliderModal';
import { IModalBodyProps, ModalBody } from './Components/ModalBody/ModalBody';
import { IModalFooterProps, ModalFooter } from './Components/ModalFooter/ModalFooter';
import { IModalHeaderProps, ModalHeader } from './Components/ModalHeader/ModalHeader';
import styles from './ProductSliderModal.module.scss';
import { ProductSliderModalService } from './ProductSliderModal.service';
import { IProductSliderForm, IProductSliderModalProps } from './ProductSliderModal.types';

export const ProductSliderModal = (props: IProductSliderModalProps): ReactElement => {
    // props
    const {
        mode = 'create',
        level = 1,
        showModal,
        onClose,
        onSubmit,
        onCreateBrand,
        onCreateStockUnit,
        onInvokeCategoryChoice,
        prefillData,
        formRef,
        brandSliderModalProps,
        selectCategorySliderModalProps,
        stockUnitSliderModalProps,
    } = props;
    const sliderModalWidth = '35%';

    // special props
    const {
        sliderModalProps,
        closeButtonType,
        modalTitle,
        modalFooterPrimaryButtonIcon,
        modalFooterPrimaryButtonLabel,
        initialFormValues,
    } = ProductSliderModalService.getDynamicProps({
        level,
        mode,
        prefillData,
        width: sliderModalWidth,
    });

    // handlers
    const onSubmitHandler = async (values: IProductSliderForm) => {
        await onSubmit({ values });
    };
    const onBackdropClickHandler: ISliderModalProps['onBackdropClick'] = (event) => {
        // props
        const formState = formRef.current?.getState();
        // callback
        onClose({
            dirty: formState?.dirty,
            submitting: formState?.submitting,
            source: 'backdrop',
            event,
        });
    };

    // draw
    return (
        <SliderModal
            showModal={showModal}
            type={sliderModalProps.type}
            width={sliderModalProps.width}
            showBackdrop={sliderModalProps.showBackdrop}
            onBackdropClick={onBackdropClickHandler}
        >
            <Form
                onSubmit={onSubmitHandler}
                initialValues={rawClone(initialFormValues)}
                subscription={{
                    submitting: true,
                    dirty: true,
                }}
            >
                {({ handleSubmit, submitting, dirty, form }) => {
                    // form reference to access for outside
                    formRef.current = form;

                    // props
                    const modalHeaderProps: IModalHeaderProps = {
                        closeButtonType,
                        dirty,
                        modalTitle,
                        onClose,
                        submitting,
                    };
                    const modalBodyProps: IModalBodyProps = {
                        showModal,
                        submitting,
                        onCreateBrand,
                        onCreateStockUnit,
                        onInvokeCategoryChoice,
                    };
                    const modalFooterProps: IModalFooterProps = {
                        dirty,
                        onClose,
                        modalFooterPrimaryButtonIcon,
                        modalFooterPrimaryButtonLabel,
                        submitting,
                    };

                    return (
                        <form className={styles.form} onSubmit={handleSubmit} noValidate>
                            <SliderModalLayoutWrapper>
                                <ModalHeader {...modalHeaderProps} />
                                <ModalBody {...modalBodyProps} />
                                <ModalFooter {...modalFooterProps} />
                            </SliderModalLayoutWrapper>
                        </form>
                    );
                }}
            </Form>
            <BrandSliderModal {...brandSliderModalProps} />
            <SelectCategorySliderModal {...selectCategorySliderModalProps} />
            <StockUnitSliderModal {...stockUnitSliderModalProps} />
        </SliderModal>
    );
};
