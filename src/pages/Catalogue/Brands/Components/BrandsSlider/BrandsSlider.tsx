import { SliderModal, SliderModalLayoutWrapper } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { Form } from 'react-final-form';
import styles from './BrandsSlider.module.scss';
import { BrandsSliderService } from './BrandsSlider.service';
import { IBrandSliderProps, IBrandsSliderForm } from './BrandsSlider.types';
import ModalBody from './Components/ModalBody/ModalBody';
import ModalFooter from './Components/ModalFooter/ModalFooter';
import ModalHeader from './Components/ModalHeader/ModalHeader';

export const BrandsSlider = (props: IBrandSliderProps): ReactElement => {
    // props
    const { sliderState, getAllBrands } = props;

    // compute
    const initialValues: IBrandsSliderForm = {
        name: '',
    };

    // handlers
    const onBackdropClick = () => {
        sliderState.showSliderModal.set(false);
    };
    const onSubmit = async (values: IBrandsSliderForm) => {
        const newBrandData = await BrandsSliderService.createNewBrand(values);
        // if new brand has been created, update
        if (!!newBrandData) {
            await getAllBrands();
            // closing sliderModal
            sliderState.showSliderModal.set(false);
        }
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
