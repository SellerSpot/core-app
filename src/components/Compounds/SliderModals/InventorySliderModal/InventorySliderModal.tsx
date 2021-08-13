import { useState } from '@hookstate/core';
import {
    ISelectOption,
    ISliderModalProps,
    SliderModal,
    SliderModalLayoutWrapper,
} from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { Form } from 'react-final-form';
import { ProductSliderModal } from '../ProductSliderModal/ProductSliderModal';
import { IModalBodyProps, ModalBody } from './Components/ModalBody/ModalBody';
import { ModalFooter } from './Components/ModalFooter/ModalFooter';
import { IModalHeaderProps, ModalHeader } from './Components/ModalHeader/ModalHeader';
import styles from './InventorySliderModal.module.scss';
import { InventorySliderModalService } from './InventorySliderModal.service';
import {
    IInventorySliderModalForm,
    IInventorySliderModalProps,
} from './InventorySliderModal.types';

interface ISearchInventorySelectMeta {
    type: 'inventoryProduct' | 'catalogueProduct';
}
export interface IInventorySliderModalState {
    selectedProduct: ISelectOption<ISearchInventorySelectMeta>;
}

export const InventorySliderModal = (props: IInventorySliderModalProps): ReactElement => {
    // props
    const {
        formRef,
        mode,
        onClose,
        onSubmit,
        prefillData,
        productSliderModalProps,
        showModal,
        allOutlets,
    } = props;

    // state
    const state = useState<IInventorySliderModalState>({
        selectedProduct: null,
    });

    // handlers
    const onBackdropClickHandler: ISliderModalProps['onBackdropClick'] = (event) => {
        const formState = formRef.current.getState();
        onClose({
            dirty: formState.dirty,
            submitting: formState.submitting,
            event,
            source: 'backdrop',
        });
    };
    const onSubmitHandler = async (values: IInventorySliderModalForm) => {
        await onSubmit({ values });
    };

    // handlers
    const allDynamicProps = InventorySliderModalService.getDynamicProps({
        mode,
        prefillData,
        allOutlets,
    });

    // draw
    return (
        <SliderModal
            showModal={showModal}
            type="fixed"
            width="720px"
            onBackdropClick={onBackdropClickHandler}
        >
            <Form
                onSubmit={onSubmitHandler}
                initialValues={allDynamicProps.initialFormValues}
                keepDirtyOnReinitialize
                subscription={{
                    submitting: true,
                    dirty: true,
                }}
            >
                {({ handleSubmit, submitting, form }) => {
                    // form reference to access for outside
                    formRef.current = form;

                    // modal component props
                    const modalHeaderProps: IModalHeaderProps = {
                        modalTitle: allDynamicProps.modalTitle,
                    };
                    const modalBodyProps: IModalBodyProps = {
                        submitting,
                        state,
                        allOutlets,
                    };

                    // draw
                    return (
                        <form className={styles.form} onSubmit={handleSubmit} noValidate>
                            <SliderModalLayoutWrapper>
                                <ModalHeader {...modalHeaderProps} />
                                <ModalBody {...modalBodyProps} />
                                <ModalFooter sample={''} />
                            </SliderModalLayoutWrapper>
                        </form>
                    );
                }}
            </Form>
            <ProductSliderModal {...productSliderModalProps} />
        </SliderModal>
    );
};
