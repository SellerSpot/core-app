import React, { ReactElement, useRef } from 'react';
import { SliderModal, SliderModalLayoutWrapper } from '@sellerspot/universal-components';
import { ITaxGroupSliderForm, ITaxGroupSliderProps } from './TaxGroupSlider.types';
import { TaxGroupSliderService } from './TaxGroupSlider.service';
import { FormApi } from 'final-form';
import { Form } from 'react-final-form';
import { IModalHeaderProps, ModalHeader } from './Components/ModalHeader/ModalHeader';
import { IModalFooterProps, ModalFooter } from './Components/ModalFooter/ModalFooter';
import { IModalBodyProps, ModalBody } from './Components/ModalBody/ModalBody';
import { TaxBracketSlider } from '../TaxBracketSlider/TaxBracketSlider';

export const TaxGroupSlider = (props: ITaxGroupSliderProps): ReactElement => {
    // props
    const {
        level,
        mode,
        onClose,
        onSubmit,
        showModal,
        taxBracketSliderProps,
        onCreateTaxBracket,
        prefillData,
        allBrackets,
    } = props;
    const sliderModalWidth = '30%';

    // hooks
    const formRef = useRef<FormApi<ITaxGroupSliderForm, Partial<ITaxGroupSliderForm>>>(null);

    // special props
    const {
        sliderModalProps,
        closeButtonType,
        modalTitle,
        modalFooterPrimaryButtonIcon,
        modalFooterPrimaryButtonLabel,
        initialFormValues,
    } = TaxGroupSliderService.getDynamicProps({
        level,
        mode,
        prefillData,
        width: sliderModalWidth,
    });

    // handlers
    const onSubmitHandler = async (values: ITaxGroupSliderForm) => {
        await onSubmit({ values });
    };

    return (
        <>
            <SliderModal
                showModal={showModal}
                type={sliderModalProps.type}
                width={sliderModalProps.width}
                showBackdrop={sliderModalProps.showBackdrop}
            >
                <Form
                    onSubmit={onSubmitHandler}
                    initialValues={initialFormValues}
                    destroyOnUnregister={true}
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
                            allBrackets,
                            onCreateTaxBracket,
                        };
                        const modalFooterProps: IModalFooterProps = {
                            dirty,
                            modalFooterPrimaryButtonIcon,
                            modalFooterPrimaryButtonLabel,
                            onClose,
                            submitting,
                        };

                        return (
                            <form onSubmit={handleSubmit} noValidate>
                                <SliderModalLayoutWrapper>
                                    <ModalHeader {...modalHeaderProps} />
                                    <ModalBody {...modalBodyProps} />
                                    <ModalFooter {...modalFooterProps} />
                                </SliderModalLayoutWrapper>
                            </form>
                        );
                    }}
                </Form>
            </SliderModal>
            <TaxBracketSlider {...taxBracketSliderProps} />
        </>
    );
};
