import { State } from '@hookstate/core';
import { SliderModalHeader } from '@sellerspot/universal-components';
import { IBrandsPageState } from 'pages/Catalogue/Brands/Brands.types';
import React, { ReactElement } from 'react';

const ModalHeader = (props: { sliderState: State<IBrandsPageState['slider']> }): ReactElement => {
    // props
    const { sliderState } = props;

    // compute
    const modalTitle = sliderState.isEditMode.get() ? 'Edit brand' : 'Create a new brand';
    // handlers
    const modalCloseCallback = () => sliderState.showSliderModal.set(false);

    // draw
    return <SliderModalHeader modalCloseCallback={modalCloseCallback} title={modalTitle} />;
};

export default ModalHeader;
