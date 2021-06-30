import React, { ReactElement } from 'react';
import { ISliderModalHeaderProps, SliderModalHeader } from '@sellerspot/universal-components';

interface IModalHeaderProps {
    modalGoBackCallback: ISliderModalHeaderProps['modalGoBackCallback'];
}

export const ModalHeader = (props: IModalHeaderProps): ReactElement => {
    // props
    const { modalGoBackCallback } = props;

    // draw
    return (
        <SliderModalHeader
            modalGoBackCallback={modalGoBackCallback}
            title="Create a new tax bracket"
        />
    );
};
