import { useState } from '@hookstate/core';
import {
    ISelectOption,
    showNotify,
    SliderModal,
    SliderModalLayoutWrapper,
} from '@sellerspot/universal-components';
import { ITaxBracketData } from '@sellerspot/universal-types';
// import { AlertDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
// import { IAlertDialogProps } from 'components/Compounds/ConfirmDialog/ConfirmDialog.types';
import React, { ReactElement } from 'react';
import { Form } from 'react-final-form';
import { ModalBody } from './Components/ModalBody/ModalBody';
import { ModalFooter } from './Components/ModalFooter/ModalFooter';
import { ModalHeader } from './Components/ModalHeader/ModalHeader';
import { TaxBracketSlider } from './Components/TaxBracketSlider/TaxBracketSlider';
import styles from './TaxGroupSlider.module.scss';
import { TaxGroupSliderService } from './TaxGroupSlider.service';
import { ITaxGroupSliderForm, ITaxGroupSliderProps } from './TaxGroupSlider.types';

// const DialogComponent = (props: IDialogComponent) => {
//     // props
//     const { showDialog, sliderState } = props;

//     // handlers
//     const handlePrimaryButtonOnClick = () => {
//         showDialog.set(false);
//         sliderState.showSliderModal.set(false);
//     };
//     const handleSecondaryButtonOnClick = () => {
//         showDialog.set(false);
//     };

//     // compute
//     const alertDialogProps: IAlertDialogProps = {
//         showDialog: showDialog.get(),
//         content: `All entered form data will be lost if you close the form`,
//         theme: 'error',
//         title: 'Are you sure?',
//         secondaryButtonProps: {
//             label: 'CLOSE FORM',
//             onClick: handleSecondaryButtonOnClick,
//         },
//         primaryButtonProps: {
//             label: 'CANCEL',
//             onClick: handlePrimaryButtonOnClick,
//         },
//     };

//     // draw
//     return <AlertDialog {...alertDialogProps} />;
// };

export const TaxGroupSlider = (props: ITaxGroupSliderProps): ReactElement => {
    // props
    const { sliderState, allTaxGroup, getAllTaxGroup } = props;

    // state
    const showDialog = useState(false);

    // compute
    const convertTaxBracketDataToISelectOption = (brackets: ITaxBracketData[]): ISelectOption[] => {
        return brackets.map((bracket) => {
            // props
            const { name, rate, id } = bracket;
            // return
            return {
                label: `${name} - ${rate}%`,
                value: id,
            };
        });
    };
    const initialValues: ITaxGroupSliderForm = {
        name: sliderState.isEditMode.get() ? sliderState.prefillData?.name?.get() : '',
        taxBrackets: sliderState.isEditMode.get()
            ? convertTaxBracketDataToISelectOption(sliderState.prefillData?.bracket?.get())
            : [],
    };

    // handlers
    const onBackdropClick = (props: { isSubmitting: boolean; isDirty: boolean }) => () => {
        // props
        const { isDirty, isSubmitting } = props;

        // compute
        if (!isSubmitting) {
            if (isDirty) {
                showDialog.set(true);
            } else {
                sliderState.showSliderModal.set(false);
            }
        }
    };
    const createNewTaxGroup = async (values: ITaxGroupSliderForm) => {
        const newTaxGroupData = await TaxGroupSliderService.createNewTaxGroup(values);
        // if new TaxGroup has been created, update
        if (!!newTaxGroupData) {
            // calling notify
            showNotify(`'${newTaxGroupData.name}' tax group created successfully!`, {
                theme: 'success',
            });
            await getAllTaxGroup();
            // closing sliderModal
            sliderState.showSliderModal.set(false);
        }
    };
    const editExistingTaxGroup = async (values: ITaxGroupSliderForm) => {
        // props
        const { name, taxBrackets } = values;
        // request
        const editedTaxGroupData = await TaxGroupSliderService.editTaxGroup({
            id: sliderState.prefillData?.get().id,
            bracket: taxBrackets.map((option) => option.value),
            name,
        });
        // if TaxGroup has been edited
        if (!!editedTaxGroupData) {
            // calling notify
            showNotify(`'${editedTaxGroupData.name}' tax group edited successfully!`, {
                theme: 'success',
            });
            await getAllTaxGroup();
            // closing sliderModal
            sliderState.showSliderModal.set(false);
        }
    };
    const onSubmit = async (values: ITaxGroupSliderForm) => {
        if (sliderState.isEditMode.get()) {
            await editExistingTaxGroup(values);
        } else {
            await createNewTaxGroup(values);
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
                // draw
                return (
                    <SliderModal
                        showModal={sliderState.showSliderModal.get()}
                        onBackdropClick={onBackdropClick({
                            isDirty: dirty,
                            isSubmitting: submitting,
                        })}
                        width="40%"
                        type="fixed"
                    >
                        <form className={styles.form} onSubmit={handleSubmit} noValidate>
                            <SliderModalLayoutWrapper>
                                <ModalHeader
                                    sliderState={sliderState}
                                    isFormDirty={dirty}
                                    showDialog={showDialog}
                                />
                                <ModalBody
                                    sliderState={sliderState}
                                    submitting={submitting}
                                    allTaxGroup={allTaxGroup}
                                />
                                <ModalFooter
                                    sliderState={sliderState}
                                    isFormDirty={dirty}
                                    isSubmitting={submitting}
                                    showDialog={showDialog}
                                />
                            </SliderModalLayoutWrapper>
                            <TaxBracketSlider
                                sliderState={sliderState.createTaxBracketSliderState}
                            />
                            {/* <DialogComponent showDialog={showDialog} sliderState={sliderState} /> */}
                        </form>
                    </SliderModal>
                );
            }}
        </Form>
    );
};
