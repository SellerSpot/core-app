import { State } from '@hookstate/core';
import { ProductSliderFieldsService } from 'components/Compounds/SliderModals/ProductSlider/Components/ModalBody/Components/Fields.service';
import { ProductSlider } from 'components/Compounds/SliderModals/ProductSlider/ProductSlider';
import { IProductSliderProps } from 'components/Compounds/SliderModals/ProductSlider/ProductSlider.types';
import { BrandSliderBaseService } from 'pages/Catalogue/Brand/Components/BrandSliderBase/BrandSliderBase.service';
import { StockUnitSliderBaseService } from 'pages/Catalogue/StockUnit/Components/StockUnitSliderBase/StockUnitSliderBase.service';
import React, { ReactElement, useRef } from 'react';
import { IProductPageState } from '../../Product.types';

interface IProductSliderBaseProps {
    sliderState: State<IProductPageState['sliderModal']>;
}

export const ProductSliderBase = (props: IProductSliderBaseProps): ReactElement => {
    // props
    const { sliderState } = props;

    // refs
    const productFormRef: IProductSliderProps['formRef'] = useRef(null);
    const brandFormRef: IProductSliderProps['brandSliderProps']['formRef'] = useRef(null);
    const stockUnitFormRef: IProductSliderProps['stockUnitSliderProps']['formRef'] = useRef(null);

    // handlers
    // product slider
    const productSliderOnCloseHandler: IProductSliderProps['onClose'] = () => {
        sliderState.showModal.set(false);
    };
    // brand slider
    const onCreateBrandHandler: IProductSliderProps['onCreateBrand'] = async (value) => {
        sliderState.brandSliderModal.set({
            mode: 'create',
            showModal: true,
            prefillData: {
                name: value,
            },
        });
    };
    const brandSliderOnCloseHandler: IProductSliderProps['brandSliderProps']['onClose'] = () => {
        sliderState.brandSliderModal.showModal.set(false);
    };
    const brandSliderOnSubmitHandler: IProductSliderProps['brandSliderProps']['onSubmit'] = async ({
        values,
    }) => {
        const newBrand = await BrandSliderBaseService.createNewBrand({
            ...values,
        });
        if (!!newBrand) {
            // updating form
            productFormRef.current.change('brand', {
                label: newBrand.name,
                value: newBrand.id,
            });
        }
        sliderState.brandSliderModal.showModal.set(false);
    };
    // stock unit slider handlers
    const onCreateStockUnitHandler: IProductSliderProps['onCreateStockUnit'] = async (value) => {
        sliderState.stockUnitSliderModal.set({
            mode: 'create',
            showModal: true,
            prefillData: {
                name: value,
            },
        });
    };
    const stockUnitSliderOnCloseHandler: IProductSliderProps['stockUnitSliderProps']['onClose'] =
        () => {
            sliderState.stockUnitSliderModal.showModal.set(false);
        };
    const stockUnitSliderOnSubmitHandler: IProductSliderProps['stockUnitSliderProps']['onSubmit'] =
        async ({ values }) => {
            const newStockUnit = await StockUnitSliderBaseService.createNewStockUnit({
                ...values,
            });
            if (!!newStockUnit) {
                const newSelectOption =
                    ProductSliderFieldsService.formatStockUnitDataForSelectComponent(newStockUnit);
                // updating form
                productFormRef.current.change('stockUnit', newSelectOption);
            }
            sliderState.stockUnitSliderModal.showModal.set(false);
        };

    // category handlers
    const onInvokeCategoryChoiceHandler: IProductSliderProps['onInvokeCategoryChoice'] = () => {
        console.log('Show CATAGORIES');
    };

    // compiling data
    const brandSliderProps: IProductSliderProps['brandSliderProps'] = {
        formRef: brandFormRef,
        level: 2,
        mode: sliderState.brandSliderModal.mode.get(),
        showModal: sliderState.brandSliderModal.showModal.get(),
        prefillData: sliderState.brandSliderModal.prefillData.get(),
        onClose: brandSliderOnCloseHandler,
        onSubmit: brandSliderOnSubmitHandler,
    };

    const stockUnitSliderProps: IProductSliderProps['stockUnitSliderProps'] = {
        formRef: stockUnitFormRef,
        level: 2,
        mode: sliderState.stockUnitSliderModal.mode.get(),
        showModal: sliderState.stockUnitSliderModal.showModal.get(),
        prefillData: sliderState.stockUnitSliderModal.prefillData.get(),
        onClose: stockUnitSliderOnCloseHandler,
        onSubmit: stockUnitSliderOnSubmitHandler,
    };

    const productSliderProps: IProductSliderProps = {
        showModal: sliderState.showModal.get(),
        formRef: productFormRef,
        mode: sliderState.mode.get(),
        prefillData: sliderState.prefillData.get(),
        level: 1,
        onClose: productSliderOnCloseHandler,
        onSubmit: () => null,
        onCreateBrand: onCreateBrandHandler,
        onCreateStockUnit: onCreateStockUnitHandler,
        onInvokeCategoryChoice: onInvokeCategoryChoiceHandler,
        brandSliderProps: brandSliderProps,
        categorySliderProps: null,
        stockUnitSliderProps: stockUnitSliderProps,
        taxBracketSliderProps: null,
        taxGroupSliderProps: null,
    };

    // draw
    return <ProductSlider {...productSliderProps} />;
};
