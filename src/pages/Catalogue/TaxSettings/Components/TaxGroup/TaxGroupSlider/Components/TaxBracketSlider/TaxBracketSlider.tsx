import {
    showNotify,
    SliderModal,
    SliderModalLayoutWrapper,
} from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { Form } from 'react-final-form';
import { ModalBody } from './Components/ModalBody/ModalBody';
import { ModalFooter } from './Components/ModalFooter/ModalFooter';
import { ModalHeader } from './Components/ModalHeader/ModalHeader';
import styles from './TaxBracketSlider.module.scss';
import { TaxBracketSliderService } from './TaxBracketSlider.service';
import { ITaxBracketSliderForm, ITaxBracketSliderProps } from './TaxBracketSlider.types';

export const TaxBracketSlider = (props: ITaxBracketSliderProps): ReactElement => {
    // props
    const { sliderState } = props;

    // compute
    const initialValues: ITaxBracketSliderForm = {
        name: sliderState.bracketName.get(),
        rate: 0,
    };

    // handlers
    const createNewTaxBracket = async (values: ITaxBracketSliderForm) => {
        const newTaxBracketData = await TaxBracketSliderService.createNewTaxBracket(values);
        // if new TaxBracket has been created, update
        if (!!newTaxBracketData) {
            // calling notify
            showNotify(`'${newTaxBracketData.name}' tax bracket created successfully!`, {
                theme: 'success',
            });
            // closing sliderModal
            sliderState.showSliderModal.set(false);
        }
    };
    const modalGoBackCallback = () => {
        // closing sliderModal
        sliderState.showSliderModal.set(false);
    };

    const onSubmit = async (values: ITaxBracketSliderForm) => {
        await createNewTaxBracket(values);
    };
    // draw
    return (
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            subscription={{
                submitting: true,
            }}
        >
            {({ handleSubmit, submitting }) => {
                // draw
                return (
                    <SliderModal
                        showModal={sliderState.showSliderModal.get()}
                        width="100%"
                        showBackdrop={false}
                        type="absolute"
                    >
                        <form className={styles.form} onSubmit={handleSubmit} noValidate>
                            <SliderModalLayoutWrapper>
                                <ModalHeader modalGoBackCallback={modalGoBackCallback} />
                                <ModalBody sliderState={sliderState} submitting={submitting} />
                                <ModalFooter sliderState={sliderState} />
                            </SliderModalLayoutWrapper>
                        </form>
                    </SliderModal>
                );
            }}
        </Form>
    );
};
