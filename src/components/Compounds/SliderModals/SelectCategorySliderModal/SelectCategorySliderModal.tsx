import React, { ReactElement } from 'react';
import {
    ISliderModalProps,
    SliderModal,
    SliderModalLayoutWrapper,
} from '../../../../../.yalc/@sellerspot/universal-components/dist';
import { CategorySliderModal } from '../CategorySliderModal/CategorySliderModal';
import { ModalBody } from './Components/ModalBody/ModalBody';
import { ModalFooter } from './Components/ModalFooter/ModalFooter';
import { ModalHeader } from './Components/ModalHeader/ModalHeader';
import { ISelectCategorySliderModalProps } from './SelectCategorySliderModal.types';
import { SelectCategorySliderModalService } from './SelectCategorySliderModal.service';

export const SelectCategorySliderModal = (props: ISelectCategorySliderModalProps): ReactElement => {
    // props
    const { categoryViewProps, onClose, onSubmit, showModal, level, categorySliderModalProps } =
        props;

    // compute
    const { type, width, closeButtonType } = SelectCategorySliderModalService.getDynamicProps({
        level,
    });

    // handlers
    const handleBackdropClick: ISliderModalProps['onBackdropClick'] = (event) => {
        onClose({
            event,
            source: 'backdrop',
        });
    };

    // draw
    return (
        <SliderModal
            onBackdropClick={handleBackdropClick}
            showModal={showModal}
            type={type}
            width={width}
        >
            <SliderModalLayoutWrapper>
                <ModalHeader closeButtonType={closeButtonType} onClose={onClose} />
                <ModalBody categoryViewProps={categoryViewProps} />
                <ModalFooter onClose={onClose} onSubmit={onSubmit} />
            </SliderModalLayoutWrapper>
            <CategorySliderModal {...categorySliderModalProps} />
        </SliderModal>
    );
};
