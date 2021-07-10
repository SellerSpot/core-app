import React, { ReactElement } from 'react';
import { ISliderModalHeaderProps, SliderModalHeader } from '@sellerspot/universal-components';
import {
    IStockUnitSliderModalDynamicValues,
    IStockUnitSliderModalOnClose,
    IStockUnitSliderProps,
} from '../../StockUnitSlider.types';

export type IModalHeaderProps = Pick<IStockUnitSliderModalOnClose, 'dirty' | 'submitting'> & {
    closeButtonType: IStockUnitSliderModalDynamicValues['closeButtonType'];
    modalTitle: IStockUnitSliderModalDynamicValues['modalTitle'];
    onClose: IStockUnitSliderProps['onClose'];
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
