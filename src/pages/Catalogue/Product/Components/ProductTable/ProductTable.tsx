import { State } from '@hookstate/core';
import { Table } from '@sellerspot/universal-components';
import { useConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { ProductSliderModalFieldsService } from 'components/Compounds/SliderModals/ProductSliderModal/Components/ModalBody/Components/Fields.service';
import React, { ReactElement } from 'react';
import {
    IBrandData,
    ICategoryData,
    IProductData,
    IStockUnitData,
} from '../../../../../../.yalc/@sellerspot/universal-types/dist';
import { IProductPageState } from '../../Product.types';
import { ProductTableService } from './ProductTable.service';

interface IProductTableProps {
    pageState: State<IProductPageState>;
    getAllProduct: () => void;
}

export const ProductTable = (props: IProductTableProps): ReactElement => {
    // props
    const { pageState, getAllProduct } = props;

    // hooks
    const confirmDialog = useConfirmDialog();

    // handlers
    const editItemClickHandler = (productData: IProductData) => async () => {
        // product data
        const { id, name, barcode, brand, category, description, stockUnit } = productData;
        pageState.sliderModal.selectCategorySliderModal.selectedCategory.merge({
            ...(category as ICategoryData),
        });
        pageState.sliderModal.merge({
            mode: 'edit',
            prefillData: {
                id,
                name,
                description,
                barcode,
                stockUnit: ProductSliderModalFieldsService.formatStockUnitDataForSelectComponent(
                    stockUnit as IStockUnitData,
                ),
                category: (category as ICategoryData).id,
                brand: ProductSliderModalFieldsService.formatBrandDataForSelectComponent(
                    brand as IBrandData,
                ),
            },
            showModal: true,
        });
    };
    const deleteItemClickHandler = (productData: IProductData) => async () => {
        const confirmResponse = await confirmDialog.confirm({
            title: 'Are you sure?',
            content: `This action will delete product "${productData.name}" from your catalogue`,
            primaryButtonProps: {
                label: 'Delete Product',
                theme: 'danger',
            },
            secondaryButtonProps: {
                label: 'Cancel',
                theme: 'primary',
            },
        });
        if (confirmResponse) {
            confirmDialog.setLoading({ isLoading: true });
            await ProductTableService.deleteProduct({ productId: productData.id });
            await getAllProduct();
            confirmDialog.setLoading({ isLoading: true });
        }
        confirmDialog.closeDialog();
    };

    const tableProps = ProductTableService.getTableProps({
        pageState,
        deleteItemClickHandler,
        editItemClickHandler,
    });

    // draw
    return <Table {...tableProps} />;
};
