import { SliderModal } from '@sellerspot/universal-components';
import React from 'react';
import { ReactElement } from 'react';
import { IAddEditBrandSliderModalProps } from './AddEditBrandSliderModal.types';

export const AddEditBrandSliderModal = (props: IAddEditBrandSliderModalProps): ReactElement => {
    const { show } = props;
    return (
        <SliderModal show={show} width={'40%'}>
            <h6>Hi there</h6>
            <h6>Hi there</h6>
        </SliderModal>
    );
};
