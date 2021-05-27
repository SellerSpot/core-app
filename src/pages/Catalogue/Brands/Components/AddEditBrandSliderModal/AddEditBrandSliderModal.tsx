import { SliderModal, SliderModalHeader } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { IAddEditBrandSliderModalProps } from './AddEditBrandSliderModal.types';

export const AddEditBrandSliderModal = (props: IAddEditBrandSliderModalProps): ReactElement => {
    const { show } = props;
    return (
        <SliderModal width={'30%'} show={show}>
            <SliderModalHeader />
        </SliderModal>
    );
};
