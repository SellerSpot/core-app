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
import styles from './StockUnitSlider.module.scss';
import ModalBody from './Components/ModalBody/ModalBody';
import ModalFooter from './Components/ModalFooter/ModalFooter';
import ModalHeader from './Components/ModalHeader/ModalHeader';
import {
    IStockUnitSliderForm,
    IStockUnitSliderProps,
    IStockUnitSliderState,
} from './StockUnitSlider.types';
import { StockUnitSliderService } from './StockUnitSlider.service';

const DialogComponent = (props: {
    showDialog: State<boolean>;
    sliderState: State<IStockUnitSliderState>;
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

const StockUnitSliderContent = (
    props: IStockUnitSliderProps & { formDirty: State<boolean>; showDialog: State<boolean> },
): ReactElement => {
    // props
    const { sliderState, formDirty, showDialog, getAllStockUnit } = props;

    // compute
    const initialValues: IStockUnitSliderForm = {
        name: sliderState.isEditMode.get() ? sliderState.prefillData?.name?.get() : '',
    };

    // handlers
    const createNewStockUnit = async (values: IStockUnitSliderForm) => {
        const newStockUnitData = await StockUnitSliderService.createNewStockUnit(values);
        // if new StockUnit has been created, update
        if (!!newStockUnitData) {
            // calling notify
            showNotify(`'${newStockUnitData.name}' stock unit created successfully!`, {
                theme: 'success',
            });
            await getAllStockUnit();
            // closing sliderModal
            sliderState.showSliderModal.set(false);
        }
    };
    const editExistingStockUnit = async (values: IStockUnitSliderForm) => {
        // props
        const { name } = values;
        // request
        const editedStockUnitData = await StockUnitSliderService.editStockUnit({
            id: sliderState.prefillData?.get().id,
            name,
        });
        // if StockUnit has been edited
        if (!!editedStockUnitData) {
            // calling notify
            showNotify(
                `'${sliderState.prefillData?.get().name}' stock unit edited to ${
                    editedStockUnitData.name
                } successfully!`,
                {
                    theme: 'success',
                },
            );
            await getAllStockUnit();
            // closing sliderModal
            sliderState.showSliderModal.set(false);
        }
    };
    const onSubmit = async (values: IStockUnitSliderForm) => {
        if (sliderState.isEditMode.get()) {
            await editExistingStockUnit(values);
        } else {
            await createNewStockUnit(values);
        }
    };
    // draw
    return (
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
    );
};

export const StockUnitSlider = (props: IStockUnitSliderProps): ReactElement => {
    // props
    const { sliderState } = props;

    // state
    const formDirty = useState(false);
    const showDialog = useState(false);

    // handlers
    const onBackdropClick = () => {
        if (formDirty.get()) {
            showDialog.set(true);
        } else {
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
            <StockUnitSliderContent {...{ ...props, formDirty, showDialog }} />
            <DialogComponent showDialog={showDialog} sliderState={sliderState} />
        </SliderModal>
    );
};
