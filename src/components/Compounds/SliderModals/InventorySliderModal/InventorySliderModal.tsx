import { useState } from '@hookstate/core';
import {
    ISliderModalProps,
    SliderModal,
    SliderModalLayoutWrapper,
} from '@sellerspot/universal-components';
import {
    IModalFooterProps,
    ModalFooter,
} from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalFooter/ModalFooter';
import { ProductSubSliderModal } from 'components/Compounds/SliderModals/InventorySliderModal/Components/SubSliderModals/ProductSubSliderModal/ProductSubSliderModal';
import { TaxBracketSubSliderModal } from 'components/Compounds/SliderModals/InventorySliderModal/Components/SubSliderModals/TaxBracketSubSliderModal/TaxBracketSubSliderModal';
import { TaxGroupSubSliderModal } from 'components/Compounds/SliderModals/InventorySliderModal/Components/SubSliderModals/TaxGroupSubSliderModal/TaxGroupSubSliderModal';
import { InventorySliderModalService } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.service';
import React, { ReactElement, useEffect } from 'react';
import { Form } from 'react-final-form';
import { introduceDelay } from 'utilities/general';
import { ICONS } from 'utilities/utilities';
import { IModalBodyProps, ModalBody } from './Components/ModalBody/ModalBody';
import { IModalHeaderProps, ModalHeader } from './Components/ModalHeader/ModalHeader';
import styles from './InventorySliderModal.module.scss';
import {
    IInventorySliderModalForm,
    IInventorySliderModalProps,
    IInventorySliderModalState,
    IInventorySliderModalSubSliderModalState,
    IInventorySubSliderHandlers,
} from './InventorySliderModal.types';

const SliderModalContent = (props: IInventorySliderModalProps) => {
    // props
    const { formRef, onClose, onSubmit, showModal, prefillData } = props;

    // state
    const inventorySliderModalState = useState<IInventorySliderModalState>({
        searchOption: null,
        currentInventoryProduct: null,
        outletsToShow: [],
        mode: 'create',
        dynamicValues: {
            modalFooterPrimaryButtonIcon: ICONS.outlineAdd,
            modalFooterPrimaryButtonLabel: 'ADD TO INVENTORY',
            modalTitle: 'Add product to inventory',
        },
        focussedOutletId: '',
    });
    const subSliderModalState = useState<IInventorySliderModalSubSliderModalState>({
        productSliderModal: {
            showModal: false,
            mode: 'create',
            prefillData: null,
        },
        taxBracketSliderModal: {
            showModal: false,
            mode: 'create',
            prefillData: null,
        },
        taxGroupSliderModal: {
            showModal: false,
            mode: 'create',
            prefillData: null,
        },
    });

    // handlers
    const onSubmitHandler = async (values: IInventorySliderModalForm) => {
        await onSubmit({
            currentProduct: inventorySliderModalState.currentInventoryProduct.get(),
            formValues: values,
            mode: inventorySliderModalState.mode.get(),
        });
    };
    const onInvokeModalWithPrefillData = async () => {
        // waiting for the formRef to attach to the form
        await introduceDelay(100);
        const { formData, outletsToShow } =
            InventorySliderModalService.assembleInventoryDataForEditingInventoryProductWithPrefillData(
                prefillData,
            );
        // updating slider modal state
        inventorySliderModalState.merge({
            outletsToShow,
            mode: 'edit',
            searchOption: null,
            currentInventoryProduct: {
                ...prefillData.product,
            },
            dynamicValues: InventorySliderModalService.getDynamicProps({
                mode: 'edit',
            }),
        });
        // initializing form with new values
        formRef.current.initialize(formData);
    };
    const onAddProductToInventoryHandler: IInventorySubSliderHandlers['onAddProductToInventory'] =
        async (option) => {
            // fixing option label issue
            option.label = option.label.replace(`Add product "`, '').replace(`" to inventory`, '');

            const { formData, inventoryProductOutlets, outletsToShow } =
                await InventorySliderModalService.assembleInventoryDataForAddingCatalogueProduct();
            // updating slider modal state
            inventorySliderModalState.merge({
                outletsToShow,
                mode: 'create',
                searchOption: option,
                currentInventoryProduct: {
                    id: option.value,
                    name: option.label,
                    outlets: inventoryProductOutlets,
                },
                dynamicValues: InventorySliderModalService.getDynamicProps({
                    mode: 'create',
                }),
            });

            // initializing form with new values
            formRef.current.initialize(formData);
        };

    const onSelectInventoryProductHandler: IInventorySubSliderHandlers['onSelectInventoryProduct'] =
        async (option) => {
            const { formData, inventoryProductOutlets, outletsToShow } =
                await InventorySliderModalService.assembleInventoryDataForEditingInventoryProduct(
                    option.value,
                );
            // updating slider modal state
            inventorySliderModalState.merge({
                outletsToShow,
                mode: 'edit',
                searchOption: option,
                currentInventoryProduct: {
                    id: option.value,
                    name: option.label,
                    outlets: inventoryProductOutlets,
                },
                dynamicValues: InventorySliderModalService.getDynamicProps({
                    mode: 'edit',
                }),
            });

            // initializing form with new values
            formRef.current.initialize(formData);
        };

    // sub slider modal handlers
    const onCreateProductHandler: IInventorySubSliderHandlers['onCreateProduct'] = (value) => {
        subSliderModalState.productSliderModal.set({
            showModal: true,
            mode: 'create',
            prefillData: {
                name: value,
            },
        });
    };
    const onCreateTaxBracketHandler: IInventorySubSliderHandlers['onCreateTaxBracket'] = (
        outletId,
        value,
    ) => {
        subSliderModalState.taxBracketSliderModal.set({
            showModal: true,
            mode: 'create',
            prefillData: {
                id: null,
                rate: 0,
                name: value,
            },
        });
        // recording current outlet id to be used later to change value post creation
        inventorySliderModalState.focussedOutletId.set(outletId);
    };
    const onCreateTaxGroupHandler: IInventorySubSliderHandlers['onCreateTaxGroup'] = (
        outletId,
        value,
    ) => {
        subSliderModalState.taxGroupSliderModal.set({
            showModal: true,
            mode: 'create',
            prefillData: {
                id: null,
                name: value,
            },
        });
        // recording current outlet id to be used later to change value post creation
        inventorySliderModalState.focussedOutletId.set(outletId);
    };

    // effects
    // used to listen to slider modal opening so that form can be prefilled with data
    // in case any data in sent in prefill data
    useEffect(() => {
        if (showModal && prefillData) {
            onInvokeModalWithPrefillData();
        }
    }, [showModal]);

    return (
        <>
            <Form
                onSubmit={onSubmitHandler}
                subscription={{
                    submitting: true,
                    dirty: true,
                }}
            >
                {({ form, handleSubmit, submitting, dirty }) => {
                    // form reference to access for outside
                    formRef.current = form;

                    // modal components props
                    const modalHeaderProps: IModalHeaderProps = {
                        modalTitle: inventorySliderModalState.dynamicValues.modalTitle.get(),
                    };
                    const modalBodyProps: IModalBodyProps = {
                        inventorySliderModalState,
                        formRef,
                        onAddProductToInventory: onAddProductToInventoryHandler,
                        onCreateProduct: onCreateProductHandler,
                        onSelectInventoryProduct: onSelectInventoryProductHandler,
                        onCreateTaxBracket: onCreateTaxBracketHandler,
                        onCreateTaxGroup: onCreateTaxGroupHandler,
                        searchOption: inventorySliderModalState.searchOption.get(),
                        submitting,
                    };
                    const modalFooterProps: IModalFooterProps = {
                        dirty,
                        inventorySliderModalState,
                        onClose,
                        submitting,
                    };

                    // draw
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
            <ProductSubSliderModal
                inventorySliderModalState={inventorySliderModalState}
                sliderModalState={subSliderModalState.productSliderModal}
                onAddProductToInventoryHandler={onAddProductToInventoryHandler}
            />
            <TaxBracketSubSliderModal
                inventorySliderModalFormRef={formRef}
                inventorySliderModalState={inventorySliderModalState}
                sliderModalState={subSliderModalState.taxBracketSliderModal}
            />
            <TaxGroupSubSliderModal
                inventorySliderModalFormRef={formRef}
                inventorySliderModalState={inventorySliderModalState}
                sliderModalState={subSliderModalState.taxGroupSliderModal}
            />
        </>
    );
};

export const InventorySliderModal = (props: IInventorySliderModalProps): ReactElement => {
    // props
    const { showModal, formRef, onClose } = props;

    // handlers
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
            onBackdropClick={onBackdropClickHandler}
            type={'fixed'}
            width={'30%'}
        >
            <SliderModalContent {...props} />
        </SliderModal>
    );
};
