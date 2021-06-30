import { State } from '@hookstate/core';
import { SliderModalHeader } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { IStockUnitSliderState } from '../../StockUnitSlider.types';

export const ModalHeader = (props: {
    sliderState: State<IStockUnitSliderState>;
    formDirty: State<boolean>;
    showDialog: State<boolean>;
}): ReactElement => {
    // props
    const { sliderState, formDirty, showDialog } = props;

    // compute
    const modalTitle = sliderState.isEditMode.get() ? 'Edit stock unit' : 'Create a new stock unit';
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
