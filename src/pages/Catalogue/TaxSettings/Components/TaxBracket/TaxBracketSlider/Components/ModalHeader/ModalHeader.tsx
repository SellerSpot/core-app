import { State } from '@hookstate/core';
import { SliderModalHeader } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { ITaxBracketSliderState } from '../../TaxBracketSlider.types';

const ModalHeader = (props: {
    sliderState: State<ITaxBracketSliderState>;
    formDirty: State<boolean>;
    showDialog: State<boolean>;
}): ReactElement => {
    // props
    const { sliderState, formDirty, showDialog } = props;

    // compute
    const modalTitle = sliderState.isEditMode.get()
        ? 'Edit tax bracket'
        : 'Create a new tax bracket';
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
