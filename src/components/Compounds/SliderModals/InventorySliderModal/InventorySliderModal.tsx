import { ISliderModalProps, SliderModal } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { Form } from 'react-final-form';
import { rawClone } from 'utilities/general';
import { SliderModalLayoutWrapper } from '@sellerspot/universal-components';
import { ProductSliderModal } from '../ProductSliderModal/ProductSliderModal';
import { IModalBodyProps, ModalBody } from './Components/ModalBody/ModalBody';
import { IModalFooterProps, ModalFooter } from './Components/ModalFooter/ModalFooter';
import { IModalHeaderProps, ModalHeader } from './Components/ModalHeader/ModalHeader';
import styles from './InventorySliderModal.module.scss';
import { InventorySliderModalService } from './InventorySliderModal.service';
import {
    IInventorySliderModalForm,
    IInventorySliderModalProps,
} from './InventorySliderModal.types';

export interface ISearchInventorySelectMeta {
    type: 'inventoryProduct' | 'catalogueProduct';
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
                {({ handleSubmit, submitting, form, dirty }) => {
                    // form reference to access for outside
                    formRef.current = form;

                    // modal component props
                    const modalHeaderProps: IModalHeaderProps = {
                        modalTitle: allDynamicProps.modalTitle,
                    };
                    const modalBodyProps: IModalBodyProps = {
                        submitting,
                        searchFieldProps: rawClone(allDynamicProps.searchField),
                        outletsToShow: allDynamicProps.outletsToShow,
                    };
                    const modalFooterProps: IModalFooterProps = {
                        dirty,
                        onClose,
                        modalFooterPrimaryButtonIcon: allDynamicProps.modalFooterPrimaryButtonIcon,
                        modalFooterPrimaryButtonLabel:
                            allDynamicProps.modalFooterPrimaryButtonLabel,
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
            <ProductSliderModal {...productSliderModalProps} />
        </SliderModal>
    );
};
