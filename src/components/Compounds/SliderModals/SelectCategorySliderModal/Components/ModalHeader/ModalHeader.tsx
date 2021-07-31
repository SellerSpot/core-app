import React from 'react';
import { ReactElement } from 'react';
import { ISliderModalHeaderProps, SliderModalHeader } from '@sellerspot/universal-components';
import {
    ISelectCategorySliderModalDynamicProps,
    ISelectCategorySliderModalProps,
} from '../../SelectCategorySliderModal.types';

interface IModalHeaderProps {
    closeButtonType: ISelectCategorySliderModalDynamicProps['closeButtonType'];
    onClose: ISelectCategorySliderModalProps['onClose'];
}

export const ModalHeader = (props: IModalHeaderProps): ReactElement => {
    // props
    const { closeButtonType, onClose } = props;

    // handlers
    const handleModalCloseCallback: ISliderModalHeaderProps['modalCloseCallback'] = (event) => {
        onClose({
            source: 'close',
            event,
        });
    };

    const handleModalGoBackCallback: ISliderModalHeaderProps['modalGoBackCallback'] = (event) => {
        onClose({
            source: 'back',
            event,
        });
    };

    // draw
    return (
        <SliderModalHeader
            title={'Select the category'}
            modalCloseCallback={closeButtonType === 'close' && handleModalCloseCallback}
            modalGoBackCallback={closeButtonType === 'back' && handleModalGoBackCallback}
        />
    );
};
