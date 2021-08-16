import { useState } from '@hookstate/core';
import {
    ISliderModalProps,
    SliderModal,
    SliderModalLayoutWrapper,
} from '@sellerspot/universal-components';
import { StockUnitSubSliderModal } from 'components/Compounds/SliderModals/ProductSliderModal/Components/SubSliderModals/StockUnitSubSliderModal/StockUnitSubSliderModal';
import React, { ReactElement } from 'react';
import { Form } from 'react-final-form';
import { SelectCategorySliderModal } from '../SelectCategorySliderModal/SelectCategorySliderModal';
import { IModalBodyProps, ModalBody } from './Components/ModalBody/ModalBody';
import { IModalFooterProps, ModalFooter } from './Components/ModalFooter/ModalFooter';
import { IModalHeaderProps, ModalHeader } from './Components/ModalHeader/ModalHeader';
import { BrandSubSliderModal } from './Components/SubSliderModals/BrandSubSliderModal/BrandSubSliderModal';
import styles from './ProductSliderModal.module.scss';
import { ProductSliderModalService } from './ProductSliderModal.service';
import {
    IProductSliderModalForm,
    IProductSliderModalProps,
    IProductSliderModalSubSliderModalState,
} from './ProductSliderModal.types';

export const ProductSliderModal = (props: IProductSliderModalProps): ReactElement => {
    // props
    const {
        mode = 'create',
        level = 1,
        showModal,
        onClose,
        onSubmit,
        onInvokeCategoryChoice,
        onCancelCategoryChoice,
        prefillData,
        treeData,
        formRef,
        selectedCategory,
        selectCategorySliderModalProps,
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

    // state
    const subSliderModalState = useState<IProductSliderModalSubSliderModalState>({
        brandSliderModal: {
            showModal: false,
            prefillData: null,
            mode: 'create',
        },
        stockUnitSliderModal: {
            showModal: false,
            prefillData: null,
            mode: 'create',
        },
    });

    // handlers
    const onSubmitHandler = async (values: IProductSliderModalForm) => {
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

    // sub slidermodal handlers
    const onCreateBrandHandler = (brandName: string) => {
        subSliderModalState.brandSliderModal.set({
            showModal: true,
            mode: 'create',
            prefillData: {
                name: brandName,
            },
        });
    };
    const onCreateStockUnitHandler = (stockUnitName: string) => {
        subSliderModalState.stockUnitSliderModal.set({
            showModal: true,
            mode: 'create',
            prefillData: {
                name: stockUnitName,
            },
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
                initialValues={initialFormValues}
                keepDirtyOnReinitialize
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
                        onCancelCategoryChoice,
                        treeData,
                        onCreateStockUnit: onCreateStockUnitHandler,
                        onInvokeCategoryChoice,
                        selectedCategory,
                        onCreateBrand: onCreateBrandHandler,
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
            <BrandSubSliderModal
                sliderModalState={subSliderModalState.brandSliderModal}
                productSliderModalFormRef={formRef}
            />
            <StockUnitSubSliderModal
                productSliderModalFormRef={formRef}
                sliderModalState={subSliderModalState.stockUnitSliderModal}
            />
            <SelectCategorySliderModal {...selectCategorySliderModalProps} />
        </SliderModal>
    );
};
