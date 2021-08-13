import React, { ReactElement } from 'react';
import { IButtonProps, ITableProps, Table } from '@sellerspot/universal-components';
import { IInventoryData, ITaxSettingData } from '@sellerspot/universal-types';
import {
    ActionsCustomRenderer,
    CustomCollapsedContentRenderer,
    ProductCustomRenderer,
    SnoCustomRenderer,
    StockAvailableCustomRenderer,
} from './Components/CustomRenderers';
import { rawClone } from 'utilities/general';
import { IInventoryPageState } from 'pages/PointOfSale/Inventory/Inventory.types';
import { State } from '@hookstate/core';
import { IInventorySliderModalForm } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';

interface IInventoryTableProps {
    pageState: State<IInventoryPageState>;
}

export const InventoryTable = (props: IInventoryTableProps): ReactElement => {
    // props
    const { pageState } = props;

    // handlers
    const editItemClickHandler =
        (rowData: IInventoryData): IButtonProps['onClick'] =>
        (event) => {
            event.stopPropagation();
            const outlets = Object.keys(rowData.configurations);
            const prefillData: IInventorySliderModalForm = {};
            outlets.map((outletId) => {
                prefillData[outletId] = {
                    ...rowData.configurations[outletId],
                    taxSetting: {
                        label: (rowData.configurations[outletId].taxSetting as ITaxSettingData)
                            .name,
                        value: (rowData.configurations[outletId].taxSetting as ITaxSettingData).id,
                    },
                };
            });
            pageState.sliderModal.merge({
                mode: 'edit',
                showModal: true,
                prefillData: {
                    prefillData,
                    product: {
                        label: rowData.name,
                        value: rowData.id,
                    },
                },
            });
        };
    const deleteItemClickHandler = (): IButtonProps['onClick'] => (event) => {
        event.stopPropagation();
        console.log('Delete Clicked');
    };

    // table props
    const tableProps: ITableProps<IInventoryData> = {
        data: rawClone(pageState.products.get()),
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
                columnName: 'Stock',
                align: 'center',
                width: '100px',
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
