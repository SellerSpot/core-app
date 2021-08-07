import React, { ReactElement } from 'react';
import { Form } from 'react-final-form';
import {
    ISliderModalProps,
    SliderModal,
    SliderModalLayoutWrapper,
} from '@sellerspot/universal-components';
import { ProductSliderModal } from '../ProductSliderModal/ProductSliderModal';
import { IModalBodyProps, ModalBody } from './Components/ModalBody/ModalBody';
import { ModalFooter } from './Components/ModalFooter/ModalFooter';
import { IModalHeaderProps, ModalHeader } from './Components/ModalHeader/ModalHeader';
import { InventorySliderModalService } from './InventorySliderModal.service';
import styles from './InventorySliderModal.module.scss';
import {
    IInventorySliderModalForm,
    IInventorySliderModalProps,
} from './InventorySliderModal.types';

export const InventorySliderModal = (props: IInventorySliderModalProps): ReactElement => {
    // props
    const { formRef, mode, onClose, onSubmit, prefillData, productSliderModalProps, showModal } =
        props;

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

    // dynamic props
    const { initialFormValues, modalTitle } = InventorySliderModalService.getDynamicProps({
        mode,
        prefillData,
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
                initialValues={initialFormValues}
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
                        modalTitle,
                    };
                    const modalBodyProps: IModalBodyProps = {
                        submitting,
                        prefillData,
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
