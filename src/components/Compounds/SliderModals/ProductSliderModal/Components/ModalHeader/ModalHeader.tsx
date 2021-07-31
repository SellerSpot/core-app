import React, { ReactElement } from 'react';
import { ISliderModalHeaderProps, SliderModalHeader } from '@sellerspot/universal-components';
import {
    IProductSliderModalDynamicValues,
    IProductSliderModalOnClose,
    IProductSliderModalProps,
} from '../../ProductSliderModal.types';

export type IModalHeaderProps = Pick<IProductSliderModalOnClose, 'dirty' | 'submitting'> & {
    closeButtonType: IProductSliderModalDynamicValues['closeButtonType'];
    modalTitle: IProductSliderModalDynamicValues['modalTitle'];
    onClose: IProductSliderModalProps['onClose'];
};

export const ModalHeader = (props: IModalHeaderProps): ReactElement => {
    // props
    const { closeButtonType, modalTitle, onClose, dirty, submitting } = props;

    // handlers
    const handleModalCloseCallback: ISliderModalHeaderProps['modalCloseCallback'] = (event) => {
        onClose({
            source: 'close',
            dirty,
            submitting,
            event,
        });
    };

    const handleModalGoBackCallback: ISliderModalHeaderProps['modalGoBackCallback'] = (event) => {
        onClose({
            source: 'back',
            dirty,
            submitting,
            event,
        });
    };

    // draw
    return (
        <SliderModalHeader
            title={modalTitle}
            modalCloseCallback={closeButtonType === 'close' && handleModalCloseCallback}
            modalGoBackCallback={closeButtonType === 'back' && handleModalGoBackCallback}
        />
    );
};
