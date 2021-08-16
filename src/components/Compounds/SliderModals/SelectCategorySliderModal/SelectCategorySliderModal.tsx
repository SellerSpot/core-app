import { useState } from '@hookstate/core';
import {
    ISliderModalProps,
    SliderModal,
    SliderModalLayoutWrapper,
} from '@sellerspot/universal-components/dist';
import React, { ReactElement } from 'react';
import { TreeItem } from 'react-sortable-tree';
import { ModalBody } from './Components/ModalBody/ModalBody';
import { ModalFooter } from './Components/ModalFooter/ModalFooter';
import { ModalHeader } from './Components/ModalHeader/ModalHeader';
import { CategorySubSliderModal } from './Components/SubSliderModals/CategorySubSliderModal.tsx/CategorySubSliderModal';
import { SelectCategorySliderModalService } from './SelectCategorySliderModal.service';
import {
    ISelectCategorySliderModalProps,
    ISelectCategorySubSliderModalState,
} from './SelectCategorySliderModal.types';

interface ISelectCategorySliderModalState {
    treeData: TreeItem[];
}

export const SelectCategorySliderModal = (props: ISelectCategorySliderModalProps): ReactElement => {
    // props
    const { onClose, onSubmit, showModal, level } = props;

    // compute
    const { type, width, closeButtonType } = SelectCategorySliderModalService.getDynamicProps({
        level,
    });

    // state
    const subSliderModalState = useState<ISelectCategorySubSliderModalState>({
        categorySliderModal: {
            showModal: false,
            contextData: null,
            prefillData: null,
            mode: 'edit',
        },
    });
    const sliderModalState = useState<ISelectCategorySliderModalState>({
        treeData: [],
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
                <ModalBody
                    categorySliderModalState={subSliderModalState.categorySliderModal}
                    treeDataState={sliderModalState.treeData}
                />
                <ModalFooter onClose={onClose} onSubmit={onSubmit} />
            </SliderModalLayoutWrapper>
            <CategorySubSliderModal
                sliderState={subSliderModalState.categorySliderModal}
                treeDataState={sliderModalState.treeData}
            />
        </SliderModal>
    );
};
