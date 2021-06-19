import { State } from '@hookstate/core';
import { SliderModalHeader } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { IBrandSliderState } from '../../BrandSlider.types';

const ModalHeader = (props: {
    sliderState: State<IBrandSliderState>;
    formDirty: State<boolean>;
    showDialog: State<boolean>;
}): ReactElement => {
    // props
    const { sliderState, formDirty, showDialog } = props;

    // compute
    const modalTitle = sliderState.isEditMode.get() ? 'Edit brand' : 'Create a new brand';
    // handlers
    const modalCloseCallback = () => {
        if (formDirty.get()) {
            showDialog.set(true);
        } else {
            sliderState.showSliderModal.set(false);
        }
    };

    // draw
    return <SliderModalHeader modalCloseCallback={modalCloseCallback} title={modalTitle} />;
};

export default ModalHeader;
