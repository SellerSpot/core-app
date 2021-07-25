import React, { ReactElement } from 'react';
import { ISliderModalHeaderProps, SliderModalHeader } from '@sellerspot/universal-components';
import {
    ICategorySliderModalDynamicValues,
    ICategorySliderModalOnClose,
    ICategorySliderProps,
} from '../../CategorySlider.types';

export type IModalHeaderProps = Pick<ICategorySliderModalOnClose, 'dirty' | 'submitting'> & {
    closeButtonType: ICategorySliderModalDynamicValues['closeButtonType'];
    modalTitle: ICategorySliderModalDynamicValues['modalTitle'];
    onClose: ICategorySliderProps['onClose'];
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
