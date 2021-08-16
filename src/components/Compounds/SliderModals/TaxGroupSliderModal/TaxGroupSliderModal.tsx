import { useState } from '@hookstate/core';
import {
    ISliderModalProps,
    SliderModal,
    SliderModalLayoutWrapper,
} from '@sellerspot/universal-components';
import { TaxBracketSubSliderModal } from 'components/Compounds/SliderModals/TaxGroupSliderModal/Components/SubSliderModals/TaxBracketSubSliderModal/TaxBracketSubSliderModal';
import React, { ReactElement } from 'react';
import { Form } from 'react-final-form';
import { IModalBodyProps, ModalBody } from './Components/ModalBody/ModalBody';
import { IModalFooterProps, ModalFooter } from './Components/ModalFooter/ModalFooter';
import { IModalHeaderProps, ModalHeader } from './Components/ModalHeader/ModalHeader';
import styles from './TaxGroupSliderModal.module.scss';
import { TaxGroupSliderModalService } from './TaxGroupSliderModal.service';
import {
    ITaxGroupSliderForm,
    ITaxGroupSliderModalProps,
    ITaxGroupSliderModalSubSliderModalState,
} from './TaxGroupSliderModal.types';

export const TaxGroupSliderModal = (props: ITaxGroupSliderModalProps): ReactElement => {
    // props
    const {
        level,
        mode,
        onClose,
        onSubmit,
        postTaxBracketCreation,
        showModal,
        prefillData,
        isPageOnStandby,
        formRef,
    } = props;
    const sliderModalWidth = '30%';

    // special props
    const {
        sliderModalProps,
        closeButtonType,
        modalTitle,
        modalFooterPrimaryButtonIcon,
        modalFooterPrimaryButtonLabel,
        initialFormValues,
    } = TaxGroupSliderModalService.getDynamicProps({
        level,
        mode,
        prefillData,
        width: sliderModalWidth,
    });

    // state
    const subSliderModalState = useState<ITaxGroupSliderModalSubSliderModalState>({
        taxBracketSliderModal: {
            showModal: false,
            mode: 'create',
            prefillData: null,
        },
    });

    // handlers
    const onSubmitHandler = async (values: ITaxGroupSliderForm) => {
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

    // sub slider modal handlers
    const onCreateTaxBracketHandler = (value: string) => {
        subSliderModalState.taxBracketSliderModal.set({
            showModal: true,
            mode: 'create',
            prefillData: {
                id: null,
                name: value,
                rate: 0,
            },
        });
    };

    return (
        <>
            <SliderModal
                showModal={showModal}
                type={sliderModalProps.type}
                width={sliderModalProps.width}
                onBackdropClick={onBackdropClickHandler}
                showBackdrop={sliderModalProps.showBackdrop}
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
                            isPageOnStandby,
                        };
                        const modalBodyProps: IModalBodyProps = {
                            isPageOnStandby,
                            showModal,
                            submitting,
                            onCreateTaxBracket: onCreateTaxBracketHandler,
                        };
                        const modalFooterProps: IModalFooterProps = {
                            isPageOnStandby,
                            dirty,
                            modalFooterPrimaryButtonIcon,
                            modalFooterPrimaryButtonLabel,
                            onClose,
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
                <TaxBracketSubSliderModal
                    taxBracketSliderModalState={subSliderModalState.taxBracketSliderModal}
                    taxGroupSliderModalFormRef={formRef}
                    postTaxBracketCreation={postTaxBracketCreation}
                />
            </SliderModal>
        </>
    );
};
