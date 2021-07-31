import { State } from '@hookstate/core';
import { CategorySliderModal } from 'components/Compounds/SliderModals/CategorySliderModal/CategorySliderModal';
import { ICategorySliderModalProps } from 'components/Compounds/SliderModals/CategorySliderModal/CategorySliderModal.types';
import { CategorySliderModalHandlers } from 'components/Compounds/SliderModals/CategorySliderModal/CategorySliderModalHandlers';
import React, { ReactElement, useRef } from 'react';
import { TreeItem } from 'react-sortable-tree';
import { rawClone } from 'utilities/general';
import { ICategoryPageState } from '../../Category.types';

interface ICategorySliderModalBaseProps {
    treeDataState: State<TreeItem[]>;
    sliderModalState: State<ICategoryPageState['sliderModal']>;
}

export const CategorySliderModalBase = (props: ICategorySliderModalBaseProps): ReactElement => {
    // props
    const { treeDataState, sliderModalState } = props;

    // refs
    const categorySliderFormRef: ICategorySliderModalProps['formRef'] = useRef(null);

    // handler
    const { onSubmitHandler, onCloseHandler } = new CategorySliderModalHandlers({
        sliderModalState,
        treeDataState: treeDataState,
    });

    // compile data
    const categorySliderModalProps: ICategorySliderModalProps = {
        showModal: sliderModalState.showModal.get(),
        formRef: categorySliderFormRef,
        level: 1,
        mode: sliderModalState.mode.get(),
        prefillData: sliderModalState.prefillData.get(),
        contextData: rawClone(sliderModalState.contextData.get()),
        onClose: onCloseHandler,
        onSubmit: onSubmitHandler,
    };

    // draw
    return <CategorySliderModal {...categorySliderModalProps} />;
};
