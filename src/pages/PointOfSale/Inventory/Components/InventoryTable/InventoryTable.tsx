import { State } from '@hookstate/core';
import { IButtonProps, ITableProps, Table } from '@sellerspot/universal-components';
import { IInventoryData } from '@sellerspot/universal-types';
import { useConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { InventoryTableService } from 'pages/PointOfSale/Inventory/Components/InventoryTable/InventoryTable.service';
import { IInventoryPageState } from 'pages/PointOfSale/Inventory/Inventory.types';
import React, { ReactElement } from 'react';
import { rawClone } from 'utilities/general';
import {
    ActionsCustomRenderer,
    CustomCollapsedContentRenderer,
    ProductCustomRenderer,
    SnoCustomRenderer,
    StockAvailableCustomRenderer,
} from './Components/CustomRenderers';

interface IInventoryTableProps {
    pageState: State<IInventoryPageState>;
    getAllInventoryProducts: () => Promise<void>;
}

export const InventoryTable = (props: IInventoryTableProps): ReactElement => {
    // props
    const { pageState, getAllInventoryProducts } = props;

    // hooks
    const confirm = useConfirmDialog();

    // handlers
    const editItemClickHandler =
        (rowData: IInventoryData): IButtonProps['onClick'] =>
        (event) => {
            event.stopPropagation();
            const outlets = Object.keys(rowData.outlets);
            const prefillData: IInventoryData['outlets'] = {};
            outlets.map((outletId) => {
                prefillData[outletId] = {
                    ...rowData.outlets[outletId],
                };
            });
            pageState.sliderModal.merge({
                mode: 'edit',
                showModal: true,
                prefillData: {
                    prefillData: prefillData,
                    product: {
                        label: rowData.name,
                        value: rowData.id,
                    },
                },
            });
        };
    const deleteItemClickHandler =
        (rowData: IInventoryData): IButtonProps['onClick'] =>
        async (event) => {
            event.stopPropagation();
            const confirmResult = await confirm.confirm({
                title: 'Are you sure?',
                primaryButtonProps: {
                    label: 'Delete',
                    theme: 'danger',
                },
                secondaryButtonProps: {
                    label: 'Cancel',
                    theme: 'primary',
                },
                content: `This will remove ${rowData.name} from all outlets`,
                theme: 'warning',
            });
            if (confirmResult) {
                confirm.setLoading({ isLoading: true });
                await InventoryTableService.deleteProductFromAllOutlets(rowData.id);
                await getAllInventoryProducts();
                confirm.setLoading({ isLoading: false });
            }
            confirm.closeDialog();
        };

    // table props
    const tableProps: ITableProps<IInventoryData> = {
        data: rawClone(pageState.products.get()),
        isLoading: pageState.tableIsLoading.get(),
        multiRowExpansion: true,
        shape: [
            {
                columnName: 'S.No',
                align: 'center',
                width: '60px',
                customRenderer: SnoCustomRenderer,
            },
            {
                columnName: 'Product',
                align: 'left',
                customRenderer: ProductCustomRenderer,
            },
            {
                columnName: 'Total Stock',
                align: 'center',
                width: '120px',
                customRenderer: StockAvailableCustomRenderer,
            },
            {
                columnName: 'Actions',
                align: 'center',
                width: '100px',
                customRenderer: ActionsCustomRenderer({
                    deleteItemClickHandler,
                    editItemClickHandler,
                }),
            },
        ],
        collapsedContentRenderer: CustomCollapsedContentRenderer({
            deleteItemClickHandler,
            editItemClickHandler,
        }),
    };

    // draw
    return <Table {...tableProps} />;
};
