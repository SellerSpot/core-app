import { IInventorySliderModalDynamicValues } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.service';
import React, { ReactElement } from 'react';
import { SliderModalHeader } from '@sellerspot/universal-components';

export type IModalHeaderProps = Pick<IInventorySliderModalDynamicValues, 'modalTitle'>;

export const ModalHeader = (props: IModalHeaderProps): ReactElement => {
    // props
    const { modalTitle } = props;

    // draw
    return <SliderModalHeader title={modalTitle} />;
};
