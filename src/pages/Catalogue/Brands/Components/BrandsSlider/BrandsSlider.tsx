import { SliderModal, SliderModalLayoutWrapper } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { Form } from 'react-final-form';
import { introduceDelay } from 'utilities/general';
import styles from './BrandsSlider.module.scss';
import { IBrandSliderProps, IBrandsSliderForm } from './BrandsSlider.types';
import ModalBody from './Components/ModalBody/ModalBody';
import ModalFooter from './Components/ModalFooter/ModalFooter';
import ModalHeader from './Components/ModalHeader/ModalHeader';

export const BrandsSlider = (props: IBrandSliderProps): ReactElement => {
    // props
    const { sliderState } = props;

    // compute
    const initialValues: IBrandsSliderForm = {
        name: '',
    };

    // handlers
    const onBackdropClick = () => {
        sliderState.showSliderModal.set(false);
    };
    const onSubmit = async (values: IBrandsSliderForm) => {
        await introduceDelay(4000);
        console.log('🚀 ~ file: BrandsSlider.tsx ~ line 73 ~ onSubmit ~ values', values);
    };

    // draw
    return (
        <SliderModal
            showModal={sliderState.showSliderModal.get()}
            onBackdropClick={onBackdropClick}
            width="40%"
            type="fixed"
        >
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                subscription={{
                    submitting: true,
                }}
            >
                {({ handleSubmit }) => {
                    return (
                        <form className={styles.form} onSubmit={handleSubmit} noValidate>
                            <SliderModalLayoutWrapper>
                                <ModalHeader sliderState={sliderState} />
                                <ModalBody sliderState={sliderState} />
                                <ModalFooter sliderState={sliderState} />
                            </SliderModalLayoutWrapper>
                        </form>
                    );
                }}
            </Form>
        </SliderModal>
    );
};
