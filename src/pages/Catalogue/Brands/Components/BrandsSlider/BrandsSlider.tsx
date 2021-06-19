import { State, useState } from '@hookstate/core';
import {
    Alert,
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    DialogLayoutWrapper,
    showNotify,
    SliderModal,
    SliderModalLayoutWrapper,
} from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { Form } from 'react-final-form';
import styles from './BrandsSlider.module.scss';
import { BrandsSliderService } from './BrandsSlider.service';
import { IBrandSliderProps, IBrandSliderState, IBrandsSliderForm } from './BrandsSlider.types';
import ModalBody from './Components/ModalBody/ModalBody';
import ModalFooter from './Components/ModalFooter/ModalFooter';
import ModalHeader from './Components/ModalHeader/ModalHeader';

const DialogComponent = (props: {
    showDialog: State<boolean>;
    sliderState: State<IBrandSliderState>;
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

export const BrandsSlider = (props: IBrandSliderProps): ReactElement => {
    // props
    const { sliderState, getAllBrands } = props;

    // state
    const formDirty = useState(false);
    const showDialog = useState(false);

    // compute
    const initialValues: IBrandsSliderForm = {
        name: sliderState.isEditMode.get() ? sliderState.prefillBrandsData?.name?.get() : '',
    };

    // handlers
    const onBackdropClick = () => {
        if (formDirty.get()) {
            showDialog.set(true);
        } else {
            sliderState.showSliderModal.set(false);
        }
    };
    const createNewBrand = async (values: IBrandsSliderForm) => {
        const newBrandData = await BrandsSliderService.createNewBrand(values);
        // if new brand has been created, update
        if (!!newBrandData) {
            // calling notify
            showNotify(`${newBrandData.name} brand created successfully!`, {
                theme: 'success',
            });
            await getAllBrands();
            // closing sliderModal
            sliderState.showSliderModal.set(false);
        }
    };
    const editExistingBrand = async (values: IBrandsSliderForm) => {
        // props
        const { name } = values;
        // request
        const editedBrandData = await BrandsSliderService.editBrand({
            id: sliderState.prefillBrandsData?.get().id,
            name,
        });
        // if brand has been edited
        if (!!editedBrandData) {
            // calling notify
            showNotify(
                `${sliderState.prefillBrandsData?.get().name} brand edited to ${
                    editedBrandData.name
                } successfully!`,
                {
                    theme: 'success',
                },
            );
            await getAllBrands();
            // closing sliderModal
            sliderState.showSliderModal.set(false);
        }
    };
    const onSubmit = async (values: IBrandsSliderForm) => {
        if (sliderState.isEditMode.get()) {
            await editExistingBrand(values);
        } else {
            await createNewBrand(values);
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
