import React, { ReactElement } from 'react';
import { ISliderModalHeaderProps, SliderModalHeader } from '@sellerspot/universal-components';
import {
    ITaxGroupSliderModalDynamicValues,
    ITaxGroupSliderModalOnClose,
    ITaxGroupSliderProps,
} from '../../TaxGroupSlider.types';

export type IModalHeaderProps = Pick<ITaxGroupSliderModalOnClose, 'dirty' | 'submitting'> & {
    closeButtonType: ITaxGroupSliderModalDynamicValues['closeButtonType'];
    modalTitle: ITaxGroupSliderModalDynamicValues['modalTitle'];
    onClose: ITaxGroupSliderProps['onClose'];
    isPageOnStandby: boolean;
};

export const ModalHeader = (props: IModalHeaderProps): ReactElement => {
    // props
    const { closeButtonType, dirty, modalTitle, onClose, submitting, isPageOnStandby } = props;

    // handlers
    const handleModalCloseCallback: ISliderModalHeaderProps['modalCloseCallback'] = (event) => {
        if (!isPageOnStandby && !submitting) {
            onClose({
                source: 'close',
                dirty,
                submitting,
                event,
            });
        }
    };

    const handleModalGoBackCallback: ISliderModalHeaderProps['modalGoBackCallback'] = (event) => {
        if (!isPageOnStandby && !submitting) {
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
