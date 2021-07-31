import { State, useState } from '@hookstate/core';
import { IProductSliderModalProps } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.types';
import { ProductSliderModal } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal';
import React, { ReactElement, useEffect, useRef } from 'react';
import { IProductPageState } from '../../Product.types';
import BrandSubSliderModalData from './SubSliderModals/BrandSubSliderModalData';
import SelectCategorySubSliderModalData from './SubSliderModals/SelectCategorySubSliderModalData';
import StockUnitSubSliderModalData from './SubSliderModals/StockUnitSubSliderModalData';
import { CategoryService } from 'pages/Catalogue/Category/Category.service';
import { CategoryViewHandlersService } from 'components/Compounds/CategoryView/CategoryViewHandlers.service';
import { useConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { BrandSliderModalService } from 'components/Compounds/SliderModals/BrandSliderModal/BrandSliderModal.service';
import { CategorySliderModalService } from 'components/Compounds/SliderModals/CategorySliderModal/CategorySliderModal.service';
import { StockUnitSliderModalService } from 'components/Compounds/SliderModals/StockUnitSliderModal/StockUnitSliderModal.service';
import { ProductSliderModalService } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.service';

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

    // hooks
    const confirmHook = useConfirmDialog();

    // custom handlers
    const categoryViewHandlersService = new CategoryViewHandlersService({
        confirmHook,
        sliderModalState: sliderModalState.selectCategorySliderModal.categorySliderModal,
        treeDataState: sliderModalState.selectCategorySliderModal.treeData,
    });

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
        categoryViewHandlersService,
    });

    // product slider modalhandlers
    const productSliderOnCloseHandler: IProductSliderModalProps['onClose'] = (props) => {
        // props
        const { source } = props;
        // state
        const brandSliderModalState = localSliderModalState.brandSliderModal;
        const selectCategorySliderModalState = localSliderModalState.selectCategorySliderModal;
        const categorySliderModalState = selectCategorySliderModalState.categorySliderModal;
        const stockUntiSliderModalState = localSliderModalState.stockUnitSliderModal;
        const productSliderModalState = localSliderModalState;

        if (source === 'backdrop') {
            if (brandSliderModalState.showModal.get()) {
                const { dirty, submitting } = brandFormRef.current.getState();
                BrandSliderModalService.handleOnCloseBrandSliderModal({
                    onCloseProps: {
                        dirty,
                        submitting,
                        event: null,
                        source,
                    },
                    sliderModalState: brandSliderModalState,
                });
            } else if (selectCategorySliderModalState.showModal.get()) {
                if (categorySliderModalState.showModal.get()) {
                    const { dirty, submitting } = categoryFormRef.current.getState();
                    CategorySliderModalService.handleOnCloseCategorySliderModal({
                        onCloseProps: {
                            dirty,
                            event: null,
                            source,
                            submitting,
                        },
                        sliderModalState: categorySliderModalState,
                    });
                } else {
                    selectCategorySliderModalState.showModal.set(false);
                }
            } else if (stockUntiSliderModalState.showModal.get()) {
                const { dirty, submitting } = categoryFormRef.current.getState();
                StockUnitSliderModalService.handleOnCloseStockUnitSliderModal({
                    onCloseProps: {
                        dirty,
                        event: null,
                        source,
                        submitting,
                    },
                    sliderModalState: stockUntiSliderModalState,
                });
            } else {
                const { dirty, submitting } = productFormRef.current.getState();
                ProductSliderModalService.handleOnCloseProductSliderModal({
                    onCloseProps: {
                        dirty,
                        event: null,
                        source,
                        submitting,
                    },
                    sliderModalState: productSliderModalState,
                });
            }
        } else {
            localSliderModalState.showModal.set(false);
        }
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
