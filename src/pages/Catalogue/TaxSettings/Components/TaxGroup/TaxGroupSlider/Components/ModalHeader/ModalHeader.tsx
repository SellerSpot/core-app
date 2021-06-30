import { State } from '@hookstate/core';
import { SliderModalHeader } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { ITaxGroupSliderState } from '../../TaxGroupSlider.types';

export const ModalHeader = (props: {
    sliderState: State<ITaxGroupSliderState>;
    isFormDirty: boolean;
    showDialog: State<boolean>;
}): ReactElement => {
    // props
    const { sliderState, isFormDirty, showDialog } = props;

    // compute
    const modalTitle = sliderState.isEditMode.get() ? 'Edit tax group' : 'Create a new tax group';
    // handlers
    const modalCloseCallback = () => {
        if (isFormDirty) {
            showDialog.set(true);
        } else {
            sliderState.showSliderModal.set(false);
        }
    };

    // draw
    return <SliderModalHeader modalCloseCallback={modalCloseCallback} title={modalTitle} />;
};
