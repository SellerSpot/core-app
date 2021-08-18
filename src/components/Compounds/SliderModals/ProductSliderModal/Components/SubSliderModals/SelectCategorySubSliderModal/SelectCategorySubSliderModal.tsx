import { State } from '@hookstate/core';
import { IProductSliderModalState } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal';
import {
    IProductSliderModalProps,
    IProductSliderModalSubSliderModalState,
} from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.types';
import { SelectCategorySliderModal } from 'components/Compounds/SliderModals/SelectCategorySliderModal/SelectCategorySliderModal';
import { SelectCategorySliderModalService } from 'components/Compounds/SliderModals/SelectCategorySliderModal/SelectCategorySliderModal.service';
import { ISelectCategorySliderModalProps } from 'components/Compounds/SliderModals/SelectCategorySliderModal/SelectCategorySliderModal.types';
import React, { ReactElement } from 'react';

interface ISelectCategorySubSliderModalProps {
    sliderModalState: State<IProductSliderModalSubSliderModalState['selectCategorySliderModal']>;
    productSliderModalFormRef: IProductSliderModalProps['formRef'];
    productSliderModalState: State<IProductSliderModalState>;
}

export const SelectCategorySubSliderModal = (
    props: ISelectCategorySubSliderModalProps,
): ReactElement => {
    // props
    const { sliderModalState, productSliderModalState, productSliderModalFormRef } = props;

    // handlers
    const onCloseHandler: ISelectCategorySliderModalProps['onClose'] = (props) => {
        SelectCategorySliderModalService.handleOnCloseSelectCategorySliderModal({
            onCloseProps: props,
            sliderModalState,
        });
    };
    const onSubmitHandler: ISelectCategorySliderModalProps['onSubmit'] = async (values) => {
        // upating local state with detailed values so that it can be used
        // to trace back the tree when showing the chosen category
        productSliderModalState.merge({
            categoryTreeData: values.treeData,
            selectedCategory: values.selectedCategory,
        });
        // updating form value
        productSliderModalFormRef.current.change('category', values.selectedCategory.id);
        sliderModalState.showModal.set(false);
    };

    // select category slider modal props
    const selectCategorySliderModalProps: ISelectCategorySliderModalProps = {
        level: 2,
        onClose: onCloseHandler,
        onSubmit: onSubmitHandler,
        showModal: sliderModalState.showModal.get(),
    };

    // draw
    return <SelectCategorySliderModal {...selectCategorySliderModalProps} />;
};
