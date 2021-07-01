import React, { ReactElement } from 'react';
import {
    ITaxBracketSliderProps,
    ITaxBracketSliderForm,
    ITaxBracketSliderModalOnClose,
} from './TaxBracketSlider.types';
import { TaxBracketSliderService } from './TaxBracket.service';
import { Form } from 'react-final-form';
import {
    ISliderModalProps,
    SliderModal,
    SliderModalLayoutWrapper,
} from '@sellerspot/universal-components';
import { IModalHeaderProps, ModalHeader } from './Components/ModalHeader/ModalHeader';
import { IModalBodyProps, ModalBody } from './Components/ModalBody/ModalBody';
import { IModalFooterProps, ModalFooter } from './Components/ModalFooter/ModalFooter';

type TOnBackdropClickHandler = (
    props: Omit<ITaxBracketSliderModalOnClose, 'source' | 'event'>,
) => ISliderModalProps['onBackdropClick'];

export const TaxBracketSlider = (props: ITaxBracketSliderProps): ReactElement => {
    // props
    const { mode = 'create', level = 1, showModal, onClose, onSubmit, prefillData } = props;
    const sliderModalWidth = '40%';

    // special props
    const {
        sliderModalProps,
        closeButtonType,
        modalTitle,
        modalFooterPrimaryButtonIcon,
        modalFooterPrimaryButtonLabel,
        initialFormValues,
    } = TaxBracketSliderService.getDynamicProps({
        level,
        mode,
        prefillData,
        width: sliderModalWidth,
    });

    // handlers
    const onSubmitHandler = (values: ITaxBracketSliderForm) => {
        onSubmit({ values });
    };
    const onBackdropClickHandler: TOnBackdropClickHandler = (props) => (event) => {
        // props
        const { dirty, submitting } = props;
        // callback
        onClose({
            dirty,
            submitting,
            source: 'backdrop',
            event,
        });
    };

    // draw
    return (
        <Form
            onSubmit={onSubmitHandler}
            initialValues={initialFormValues}
            subscription={{
                submitting: true,
                dirty: true,
            }}
        >
            {({ handleSubmit, submitting, dirty }) => {
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
                };
                const modalFooterProps: IModalFooterProps = {
                    dirty,
                    onClose,
                    modalFooterPrimaryButtonIcon,
                    modalFooterPrimaryButtonLabel,
                    submitting,
                };

                return (
                    <SliderModal
                        showModal={showModal}
                        type={sliderModalProps.type}
                        width={sliderModalProps.width}
                        showBackdrop={sliderModalProps.showBackdrop}
                        onBackdropClick={onBackdropClickHandler({
                            dirty,
                            submitting,
                        })}
                    >
                        <form onSubmit={handleSubmit} noValidate>
                            <SliderModalLayoutWrapper>
                                <ModalHeader {...modalHeaderProps} />
                                <ModalBody {...modalBodyProps} />
                                <ModalFooter {...modalFooterProps} />
                            </SliderModalLayoutWrapper>
                        </form>
                    </SliderModal>
                );
            }}
        </Form>
    );
};
