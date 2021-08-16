import { useState } from '@hookstate/core';
import {
    ISliderModalProps,
    SliderModal,
    SliderModalLayoutWrapper,
} from '@sellerspot/universal-components/dist';
import { CategoryService } from 'pages/Catalogue/Category/Category.service';
import React, { ReactElement, useEffect } from 'react';
import { TreeItem } from 'react-sortable-tree';
import { rawClone } from 'utilities/general';
import { ModalBody } from './Components/ModalBody/ModalBody';
import { ModalFooter } from './Components/ModalFooter/ModalFooter';
import { ModalHeader } from './Components/ModalHeader/ModalHeader';
import { CategorySubSliderModal } from './Components/SubSliderModals/CategorySubSliderModal.tsx/CategorySubSliderModal';
import { SelectCategorySliderModalService } from './SelectCategorySliderModal.service';
import {
    ISelectCategorySliderModalProps,
    ISelectCategorySubSliderModalState,
} from './SelectCategorySliderModal.types';

export interface ISelectCategorySliderModalState {
    treeData: TreeItem[];
    selectedCategory: TreeItem;
    isLoading: boolean;
}

export const SelectCategorySliderModal = (props: ISelectCategorySliderModalProps): ReactElement => {
    // props
    const { onClose, onSubmit, showModal, level } = props;

    // compute
    const { type, width, closeButtonType, showBackdrop } =
        SelectCategorySliderModalService.getDynamicProps({
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
        selectedCategory: null,
        isLoading: false,
    });

    // handlers
    const getAllCategories = async () => {
        const allCategories = await CategoryService.getAllCategories();
        sliderModalState.merge({
            isLoading: false,
            treeData: allCategories,
        });
    };
    const handleBackdropClick: ISliderModalProps['onBackdropClick'] = (event) => {
        onClose({
            event,
            source: 'backdrop',
        });
    };

    // effects
    useEffect(() => {
        getAllCategories();
    }, []);

    // draw
    return (
        <SliderModal
            onBackdropClick={handleBackdropClick}
            showModal={showModal}
            showBackdrop={showBackdrop}
            type={type}
            width={width}
        >
            <SliderModalLayoutWrapper>
                <ModalHeader closeButtonType={closeButtonType} onClose={onClose} />
                <ModalBody
                    categorySliderModalState={subSliderModalState.categorySliderModal}
                    sliderModalState={sliderModalState}
                />
                <ModalFooter
                    onClose={onClose}
                    onSubmit={onSubmit}
                    selectedCategory={rawClone(sliderModalState.selectedCategory.get())}
                    treeData={rawClone(sliderModalState.treeData.get())}
                />
            </SliderModalLayoutWrapper>
            <CategorySubSliderModal
                sliderState={subSliderModalState.categorySliderModal}
                treeDataState={sliderModalState.treeData}
            />
        </SliderModal>
    );
};
