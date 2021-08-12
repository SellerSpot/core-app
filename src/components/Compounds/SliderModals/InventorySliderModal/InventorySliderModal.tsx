import React, { ReactElement, useEffect } from 'react';
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
import {
    IInventorySliderModalDynamicValues,
    InventorySliderModalService,
} from './InventorySliderModal.service';
import styles from './InventorySliderModal.module.scss';
import {
    IInventorySliderModalForm,
    IInventorySliderModalProps,
} from './InventorySliderModal.types';
import { useState } from '@hookstate/core';
import { LoadingView } from 'components/Compounds/SliderModals/InventorySliderModal/Components/LoadingView/LoadingView';

export interface IInventorySliderModalLocalState {
    modalLoading: boolean;
    dynamicProps: IInventorySliderModalDynamicValues;
    selectedProduct: string;
}

export const InventorySliderModal = (props: IInventorySliderModalProps): ReactElement => {
    // props
    const { formRef, mode, onClose, onSubmit, prefillData, productSliderModalProps, showModal } =
        props;

    // state
    const localState = useState<IInventorySliderModalLocalState>({
        dynamicProps: null,
        modalLoading: true,
        selectedProduct: '',
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
    const getDynamicProps = async () => {
        const allDynamicProps = await InventorySliderModalService.getDynamicProps({
            mode,
            prefillData,
        });
        localState.merge({
            dynamicProps: allDynamicProps,
            modalLoading: false,
        });
    };

    // effects
    useEffect(() => {
        getDynamicProps();
    }, []);

    // draw
    return (
        <SliderModal
            showModal={showModal}
            type="fixed"
            width="820px"
            onBackdropClick={onBackdropClickHandler}
        >
            {localState.modalLoading.get() ? (
                <LoadingView />
            ) : (
                <Form
                    onSubmit={onSubmitHandler}
                    initialValues={localState.dynamicProps.initialFormValues.get()}
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
                            modalTitle: localState.dynamicProps.modalTitle.get(),
                        };
                        const modalBodyProps: IModalBodyProps = {
                            submitting,
                            localState,
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
            )}
            <ProductSliderModal {...productSliderModalProps} />
        </SliderModal>
    );
};
