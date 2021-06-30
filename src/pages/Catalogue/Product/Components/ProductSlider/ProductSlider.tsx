import { SliderModal, SliderModalLayoutWrapper } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { Form } from 'react-final-form';
import { introduceDelay } from 'utilities/general';
import styles from './ProductSlider.module.scss';
import { IProductSliderForm, IProductSliderProps } from './ProductSlider.types';
import { ModalBody } from './Components/ModalBody/ModalBody';
import { ModalFooter } from './Components/ModalFooter/ModalFooter';
import { ModalHeader } from './Components/ModalHeader/ModalHeader';

export const ProductSlider = (props: IProductSliderProps): ReactElement => {
    // props
    const { sliderState } = props;

    // compute
    const initialValues: IProductSliderForm = {
        name: '',
        barcode: '',
        brand: '',
    };

    // handlers
    const onBackdropClick = () => {
        sliderState.showSliderModal.set(false);
    };
    const onSubmit = async (values: IProductSliderForm) => {
        console.log('🚀 ~ file: ProductSlider.tsx ~ line 25 ~ onSubmit ~ values', values);
        await introduceDelay(4000);
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
