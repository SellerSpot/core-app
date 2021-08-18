import React, { ReactElement } from 'react';
import { ISliderModalHeaderProps, SliderModalHeader } from '@sellerspot/universal-components';
import {
    ITaxGroupSliderModalDynamicValues,
    ITaxGroupSliderModalOnClose,
    ITaxGroupSliderModalProps,
} from '../../TaxGroupSliderModal.types';

export type IModalHeaderProps = Pick<ITaxGroupSliderModalOnClose, 'dirty' | 'submitting'> & {
    closeButtonType: ITaxGroupSliderModalDynamicValues['closeButtonType'];
    modalTitle: ITaxGroupSliderModalDynamicValues['modalTitle'];
    onClose: ITaxGroupSliderModalProps['onClose'];
};

export const ModalHeader = (props: IModalHeaderProps): ReactElement => {
    // props
    const { closeButtonType, dirty, modalTitle, onClose, submitting } = props;

    // handlers
    const handleModalCloseCallback: ISliderModalHeaderProps['modalCloseCallback'] = (event) => {
        if (!submitting) {
            onClose({
                source: 'close',
                dirty,
                submitting,
                event,
            });
        }
    };

    const handleModalGoBackCallback: ISliderModalHeaderProps['modalGoBackCallback'] = (event) => {
        if (!submitting) {
            onClose({
                source: 'back',
                dirty,
                submitting,
                event,
            });
        }
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
