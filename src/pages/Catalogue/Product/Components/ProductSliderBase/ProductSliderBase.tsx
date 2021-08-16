import { State, useState } from '@hookstate/core';
import { ProductSliderModal } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal';
import { ProductSliderModalService } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.service';
import { IProductSliderModalProps } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.types';
import { CategoryService } from 'pages/Catalogue/Category/Category.service';
import React, { ReactElement, useEffect, useRef } from 'react';
import { rawClone } from 'utilities/general';
import { IProductPageState } from '../../Product.types';

interface IProductSliderBaseProps {
    sliderModalState: State<IProductPageState['sliderModal']>;
    getAllProduct: () => void;
}

export const ProductSliderBase = (props: IProductSliderBaseProps): ReactElement => {
    // props
    const { sliderModalState, getAllProduct } = props;

    // state
    const localSliderModalState = useState(sliderModalState);

    // refs
    const productFormRef: IProductSliderModalProps['formRef'] = useRef(null);

    // product slider modalhandlers
    const productSliderOnCloseHandler: IProductSliderModalProps['onClose'] = (props) => {
        // props
        const { source } = props;
        // state

        if (source === 'backdrop') {
            localSliderModalState.showModal.set(false);
        }
    };
    const onCancelCategoryChoiceHandler = () => {
        localSliderModalState.selectCategorySliderModal.selectedCategory.set(null);
    };
    const onSubmitHandler: IProductSliderModalProps['onSubmit'] = async ({ values }) => {
        // values
        const { barcode, brand, description, name, stockUnit } = values;
        if (localSliderModalState.mode.get() === 'create') {
            await ProductSliderModalService.createNewProduct({
                name,
                barcode,
                description,
                brand: brand,
                category:
                    localSliderModalState.selectCategorySliderModal.selectedCategory.get()?.id,
                stockUnit: stockUnit,
            });
        } else {
            await ProductSliderModalService.editProduct({
                id: localSliderModalState.prefillData.id.get(),
                name,
                barcode,
                description,
                brand: brand,
                category:
                    localSliderModalState.selectCategorySliderModal.selectedCategory.get()?.id,
                stockUnit: stockUnit,
            });
        }
        getAllProduct();
        localSliderModalState.showModal.set(false);
    };

    const productSliderModalProps: IProductSliderModalProps = {
        showModal: localSliderModalState.showModal.get(),
        formRef: productFormRef,
        mode: localSliderModalState.mode.get(),
        prefillData: localSliderModalState.prefillData.get(),
        selectedCategory: rawClone(
            localSliderModalState.selectCategorySliderModal.selectedCategory.get(),
        ),
        treeData: rawClone(localSliderModalState.selectCategorySliderModal.treeData.get()),
        level: 1,
        onClose: productSliderOnCloseHandler,
        onSubmit: onSubmitHandler,
        onInvokeCategoryChoice: null,
        onCancelCategoryChoice: onCancelCategoryChoiceHandler,
        selectCategorySliderModalProps: null,
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
