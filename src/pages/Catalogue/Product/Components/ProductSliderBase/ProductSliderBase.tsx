import { State } from '@hookstate/core';
import { IProductSliderModalProps } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.types';
import { ProductSliderModal } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal';
import React, { ReactElement, useRef } from 'react';
import { IProductPageState } from '../../Product.types';
import BrandSubSliderModalData from './SubSliderModals/BrandSubSliderModalData';
import SelectCategorySubSliderModalData from './SubSliderModals/SelectCategorySubSliderModalData';
import StockUnitSubSliderModalData from './SubSliderModals/StockUnitSubSliderModalData';

interface IProductSliderBaseProps {
    sliderModalState: State<IProductPageState['sliderModal']>;
}

export const ProductSliderBase = (props: IProductSliderBaseProps): ReactElement => {
    // props
    const { sliderModalState } = props;

    // refs
    const productFormRef: IProductSliderModalProps['formRef'] = useRef(null);
    const brandFormRef: IProductSliderModalProps['brandSliderModalProps']['formRef'] = useRef(null);
    const stockUnitFormRef: IProductSliderModalProps['stockUnitSliderModalProps']['formRef'] =
        useRef(null);
    const categoryFormRef: IProductSliderModalProps['selectCategorySliderModalProps']['categorySliderModalProps']['formRef'] =
        useRef(null);

    // sub slider modalprops data
    const brandSubSliderModalData = new BrandSubSliderModalData({
        brandFormRef,
        productFormRef,
        sliderModalState,
    });
    const stockUnitSubSliderModalData = new StockUnitSubSliderModalData({
        productFormRef,
        sliderModalState,
        stockUnitFormRef,
    });
    const selectCategorySubSliderModalData = new SelectCategorySubSliderModalData({
        sliderModalState,
        categoryFormRef,
    });

    // product slider modalhandlers
    const productSliderOnCloseHandler: IProductSliderModalProps['onClose'] = () => {
        sliderModalState.showModal.set(false);
    };

    const productSliderModalProps: IProductSliderModalProps = {
        showModal: sliderModalState.showModal.get(),
        formRef: productFormRef,
        mode: sliderModalState.mode.get(),
        prefillData: sliderModalState.prefillData.get(),
        level: 1,
        onClose: productSliderOnCloseHandler,
        onSubmit: () => null,
        onCreateBrand: brandSubSliderModalData.onCreateBrandHandler,
        onCreateStockUnit: stockUnitSubSliderModalData.onCreateStockUnitHandler,
        onInvokeCategoryChoice: selectCategorySubSliderModalData.onInvokeCategoryChoiceHandler,
        brandSliderModalProps: brandSubSliderModalData.getSliderModalProps(),
        selectCategorySliderModalProps: selectCategorySubSliderModalData.getSliderModalProps(),
        stockUnitSliderModalProps: stockUnitSubSliderModalData.getSliderModalProps(),
    };

    // draw
    return <ProductSliderModal {...productSliderModalProps} />;
};
