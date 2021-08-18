import { State } from '@hookstate/core';
import { CategorySliderModal } from 'components/Compounds/SliderModals/CategorySliderModal/CategorySliderModal';
import { ICategorySliderModalProps } from 'components/Compounds/SliderModals/CategorySliderModal/CategorySliderModal.types';
import { CategorySliderModalHandlers } from 'components/Compounds/SliderModals/CategorySliderModal/CategorySliderModalHandlers';
import { ISelectCategorySubSliderModalState } from 'components/Compounds/SliderModals/SelectCategorySliderModal/SelectCategorySliderModal.types';
import React, { ReactElement, useRef } from 'react';
import { TreeItem } from 'react-sortable-tree';

interface ICategorySubSliderModalProps {
    sliderState: State<ISelectCategorySubSliderModalState['categorySliderModal']>;
    treeDataState: State<TreeItem[]>;
}

export const CategorySubSliderModal = (props: ICategorySubSliderModalProps): ReactElement => {
    // props
    const { sliderState, treeDataState } = props;

    // hooks
    const formRef: ICategorySliderModalProps['formRef'] = useRef(null);

    // handlers
    const categorySliderModalHandlers = new CategorySliderModalHandlers({
        sliderModalState: sliderState,
        treeDataState: treeDataState,
    });
    const onCloseHandler: ICategorySliderModalProps['onClose'] = (props) => {
        categorySliderModalHandlers.onCloseHandler(props);
    };
    const onSubmitHandler: ICategorySliderModalProps['onSubmit'] = async ({ values }) => {
        await categorySliderModalHandlers.onSubmitHandler({
            values,
        });
    };

    // category slider modal props
    const categorySliderModalProps: ICategorySliderModalProps = {
        formRef,
        showModal: sliderState.showModal.get(),
        contextData: sliderState.contextData.get(),
        prefillData: sliderState.prefillData.get(),
        mode: sliderState.mode.get(),
        level: 2,
        onClose: onCloseHandler,
        onSubmit: onSubmitHandler,
    };

    // draw
    return <CategorySliderModal {...categorySliderModalProps} />;
};
