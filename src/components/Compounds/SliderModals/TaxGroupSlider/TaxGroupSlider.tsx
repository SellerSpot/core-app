import {
    ISliderModalProps,
    SliderModal,
    SliderModalLayoutWrapper,
} from '@sellerspot/universal-components';
import { FormApi } from 'final-form';
import React, { ReactElement, useRef } from 'react';
import { Form } from 'react-final-form';
import { TaxBracketSlider } from '../TaxBracketSlider/TaxBracketSlider';
import { IModalBodyProps, ModalBody } from './Components/ModalBody/ModalBody';
import { IModalFooterProps, ModalFooter } from './Components/ModalFooter/ModalFooter';
import { IModalHeaderProps, ModalHeader } from './Components/ModalHeader/ModalHeader';
import styles from './TaxGroupSlider.module.scss';
import { TaxGroupSliderService } from './TaxGroupSlider.service';
import { ITaxGroupSliderForm, ITaxGroupSliderProps } from './TaxGroupSlider.types';

export const TaxGroupSlider = (props: ITaxGroupSliderProps): ReactElement => {
    // props
    const {
        level,
        mode,
        onClose,
        onSubmit,
        showModal,
        taxBracketSliderProps,
        onCreateTaxSetting,
        prefillData,
        allBrackets,
        isPageOnStandby,
    } = props;
    const sliderModalWidth = '35%';

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
                            allBrackets,
                            onCreateTaxSetting,
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
                <TaxBracketSlider {...taxBracketSliderProps} />
            </SliderModal>
        </>
    );
};
