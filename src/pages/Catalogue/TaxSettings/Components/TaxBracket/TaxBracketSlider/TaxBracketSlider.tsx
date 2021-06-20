import { State, useState } from '@hookstate/core';
import {
    Alert,
    Button,
    Dialog,
    DialogBody,
    SliderModal,
    DialogFooter,
    DialogHeader,
    DialogLayoutWrapper,
    SliderModalLayoutWrapper,
    showNotify,
} from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { Form } from 'react-final-form';
import styles from './TaxBracketSlider.module.scss';
import ModalBody from './Components/ModalBody/ModalBody';
import ModalFooter from './Components/ModalFooter/ModalFooter';
import ModalHeader from './Components/ModalHeader/ModalHeader';
import {
    ITaxBracketSliderForm,
    ITaxBracketSliderProps,
    ITaxBracketSliderState,
} from './TaxBracketSlider.types';
import { TaxBracketSliderService } from './TaxBracketSlider.service';

const DialogComponent = (props: {
    showDialog: State<boolean>;
    sliderState: State<ITaxBracketSliderState>;
}) => {
    // props
    const { showDialog, sliderState } = props;
    // handlers
    const handlePrimaryButtonOnClick = () => {
        showDialog.set(false);
        sliderState.showSliderModal.set(false);
    };
    const handleSecondaryButtonOnClick = () => {
        showDialog.set(false);
    };

    // draw
    return (
        <Dialog showDialog={showDialog.get()}>
            <DialogLayoutWrapper>
                <DialogHeader title={'Are you sure?'} />
                <DialogBody>
                    <Alert type="error">{`All entered form data will be lost if you close the form`}</Alert>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="outlined"
                        theme="primary"
                        label={'Cancel'}
                        onClick={handleSecondaryButtonOnClick}
                    />
                    <Button
                        variant="contained"
                        theme="danger"
                        label={'Close Form'}
                        onClick={handlePrimaryButtonOnClick}
                    />
                </DialogFooter>
            </DialogLayoutWrapper>
        </Dialog>
    );
};

export const TaxBracketSlider = (props: ITaxBracketSliderProps): ReactElement => {
    // props
    const { sliderState, getAllTaxBracket } = props;

    // state
    const formDirty = useState(false);
    const showDialog = useState(false);

    // compute
    const initialValues: ITaxBracketSliderForm = {
        name: sliderState.isEditMode.get() ? sliderState.prefillData?.name?.get() : '',
        rate: sliderState.isEditMode.get() ? sliderState.prefillData?.rate?.get() : 0,
    };

    // handlers
    const onBackdropClick = () => {
        if (formDirty.get()) {
            showDialog.set(true);
        } else {
            sliderState.showSliderModal.set(false);
        }
    };
    const createNewTaxBracket = async (values: ITaxBracketSliderForm) => {
        const newTaxBracketData = await TaxBracketSliderService.createNewTaxBracket(values);
        // if new TaxBracket has been created, update
        if (!!newTaxBracketData) {
            // calling notify
            showNotify(`'${newTaxBracketData.name}' tax bracket created successfully!`, {
                theme: 'success',
            });
            await getAllTaxBracket();
            // closing sliderModal
            sliderState.showSliderModal.set(false);
        }
    };
    const editExistingTaxBracket = async (values: ITaxBracketSliderForm) => {
        // props
        const { name, rate } = values;
        // request
        const editedTaxBracketData = await TaxBracketSliderService.editTaxBracket({
            id: sliderState.prefillData?.get().id,
            name,
            rate,
        });
        // if TaxBracket has been edited
        if (!!editedTaxBracketData) {
            // calling notify
            showNotify(`'${editedTaxBracketData.name}' tax bracket edited successfully!`, {
                theme: 'success',
            });
            await getAllTaxBracket();
            // closing sliderModal
            sliderState.showSliderModal.set(false);
        }
    };
    const onSubmit = async (values: ITaxBracketSliderForm) => {
        if (sliderState.isEditMode.get()) {
            await editExistingTaxBracket(values);
        } else {
            await createNewTaxBracket(values);
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
                    dirty: true,
                }}
            >
                {({ handleSubmit, submitting, dirty }) => {
                    // compute
                    if (dirty) {
                        formDirty.set(true);
                    } else {
                        formDirty.set(false);
                    }

                    // draw
                    return (
                        <form className={styles.form} onSubmit={handleSubmit} noValidate>
                            <SliderModalLayoutWrapper>
                                <ModalHeader
                                    sliderState={sliderState}
                                    formDirty={formDirty}
                                    showDialog={showDialog}
                                />
                                <ModalBody sliderState={sliderState} submitting={submitting} />
                                <ModalFooter
                                    sliderState={sliderState}
                                    formDirty={formDirty}
                                    showDialog={showDialog}
                                />
                            </SliderModalLayoutWrapper>
                        </form>
                    );
                }}
            </Form>
            <DialogComponent showDialog={showDialog} sliderState={sliderState} />
        </SliderModal>
    );
};
