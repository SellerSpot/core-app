import { State } from '@hookstate/core';
import { SliderModalHeader } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { IProductSliderState } from '../../ProductSlider.types';

export const ModalHeader = (props: { sliderState: State<IProductSliderState> }): ReactElement => {
    // props
    const { sliderState } = props;

    // compute
    const modalTitle = sliderState.isEditMode.get() ? 'Edit product' : 'Create a new product';
    // handlers
    const modalCloseCallback = () => sliderState.showSliderModal.set(false);

    // draw
    return <SliderModalHeader modalCloseCallback={modalCloseCallback} title={modalTitle} />;
};
