import { State, useState } from '@hookstate/core';
import {
    Alert,
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    DialogLayoutWrapper,
    SliderModal,
    SliderModalLayoutWrapper,
} from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { Form } from 'react-final-form';
import ModalBody from './Components/ModalBody/ModalBody';
import ModalFooter from './Components/ModalFooter/ModalFooter';
import ModalHeader from './Components/ModalHeader/ModalHeader';
import styles from './TaxGroupSlider.module.scss';
import {
    ITaxGroupSliderForm,
    ITaxGroupSliderProps,
    ITaxGroupSliderState,
} from './TaxGroupSlider.types';

const DialogComponent = (props: {
    showDialog: State<boolean>;
    sliderState: State<ITaxGroupSliderState>;
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

export const TaxGroupSlider = (props: ITaxGroupSliderProps): ReactElement => {
    // props
    const { sliderState } = props;

    // state
    const formDirty = useState(false);
    const showDialog = useState(false);

    // effects
    // useEffect(() => {}, []);

    // compute
    const initialValues: ITaxGroupSliderForm = {
        name: sliderState.isEditMode.get() ? sliderState.prefillData?.name?.get() : '',
    };

    // handlers
    const onBackdropClick = () => {
        if (formDirty.get()) {
            showDialog.set(true);
        } else {
            sliderState.showSliderModal.set(false);
        }
    };
    // const createNewTaxGroup = async (values: ITaxGroupSliderForm) => {
    //     const newTaxGroupData = await TaxGroupSliderService.createNewTaxGroup(values);
    //     // if new TaxGroup has been created, update
    //     if (!!newTaxGroupData) {
    //         // calling notify
    //         showNotify(`'${newTaxGroupData.name}' stock unit created successfully!`, {
    //             theme: 'success',
    //         });
    //         await getAllTaxGroup();
    //         // closing sliderModal
    //         sliderState.showSliderModal.set(false);
    //     }
    // };
    // const editExistingTaxGroup = async (values: ITaxGroupSliderForm) => {
    //     // props
    //     const { name } = values;
    //     // request
    //     const editedTaxGroupData = await TaxGroupSliderService.editTaxGroup({
    //         id: sliderState.prefillData?.get().id,
    //         name,
    //     });
    //     // if TaxGroup has been edited
    //     if (!!editedTaxGroupData) {
    //         // calling notify
    //         showNotify(
    //             `'${sliderState.prefillData?.get().name}' stock unit edited to ${
    //                 editedTaxGroupData.name
    //             } successfully!`,
    //             {
    //                 theme: 'success',
    //             },
    //         );
    //         await getAllTaxGroup();
    //         // closing sliderModal
    //         sliderState.showSliderModal.set(false);
    //     }
    // };
    const onSubmit = async (values: ITaxGroupSliderForm) => {
        console.log(values);
        // if (sliderState.isEditMode.get()) {
        //     await editExistingTaxGroup(values);
        // } else {
        //     await createNewTaxGroup(values);
        // }
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
