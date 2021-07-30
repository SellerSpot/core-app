import { State, useState } from '@hookstate/core';
import { IProductSliderModalProps } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.types';
import { ProductSliderModal } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal';
import React, { ReactElement, useEffect, useRef } from 'react';
import { IProductPageState } from '../../Product.types';
import BrandSubSliderModalData from './SubSliderModals/BrandSubSliderModalData';
import SelectCategorySubSliderModalData from './SubSliderModals/SelectCategorySubSliderModalData';
import StockUnitSubSliderModalData from './SubSliderModals/StockUnitSubSliderModalData';
import { CategoryService } from 'pages/Catalogue/Category/Category.service';

interface IProductSliderBaseProps {
    sliderModalState: State<IProductPageState['sliderModal']>;
}

export const ProductSliderBase = (props: IProductSliderBaseProps): ReactElement => {
    // props
    const { sliderModalState } = props;

    // state
    const localSliderModalState = useState(sliderModalState);

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
        sliderModalState: localSliderModalState,
    });
    const stockUnitSubSliderModalData = new StockUnitSubSliderModalData({
        productFormRef,
        sliderModalState: localSliderModalState,
        stockUnitFormRef,
    });
    const selectCategorySubSliderModalData = new SelectCategorySubSliderModalData({
        sliderModalState: localSliderModalState,
        categoryFormRef,
    });

    // product slider modalhandlers
    const productSliderOnCloseHandler: IProductSliderModalProps['onClose'] = () => {
        localSliderModalState.showModal.set(false);
    };

    const productSliderModalProps: IProductSliderModalProps = {
        showModal: localSliderModalState.showModal.get(),
        formRef: productFormRef,
        mode: localSliderModalState.mode.get(),
        prefillData: localSliderModalState.prefillData.get(),
        level: 1,
        onClose: productSliderOnCloseHandler,
        onSubmit: () => null,
        onCreateBrand: brandSubSliderModalData.onCreateBrandHandler,
        onCreateStockUnit: stockUnitSubSliderModalData.onCreateStockUnitHandler,
        onInvokeCategoryChoice:
            selectCategorySubSliderModalData.onInvokeSelectCategoryChoiceHandler,
        brandSliderModalProps: brandSubSliderModalData.getSliderModalProps(),
        selectCategorySliderModalProps: selectCategorySubSliderModalData.getSliderModalProps(),
        stockUnitSliderModalProps: stockUnitSubSliderModalData.getSliderModalProps(),
    };

    // handlers
    const fetchCategoriesData = async () => {
        const allCategories = await CategoryService.getAllCategories();
        console.log('Fetched Data');
        localSliderModalState.selectCategorySliderModal.treeData.set(allCategories);
    };

    // effects
    useEffect(() => {
        if (localSliderModalState.showModal.get()) {
            fetchCategoriesData();
        }
    }, [localSliderModalState.showModal.get()]);

    // draw
    return <ProductSliderModal {...productSliderModalProps} />;
};
