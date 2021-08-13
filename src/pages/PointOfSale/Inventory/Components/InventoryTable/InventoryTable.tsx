import React, { ReactElement } from 'react';
import { ITableProps, Table } from '@sellerspot/universal-components';
import { IInventoryData } from '@sellerspot/universal-types';
import {
    ActionsCustomRenderer,
    CustomCollapsedContentRenderer,
    ProductCustomRenderer,
    SnoCustomRenderer,
    StockAvailableCustomRenderer,
} from './Components/CustomRenderers';
import { rawClone } from 'utilities/general';

interface IInventoryTableProps {
    inventoryProducts: IInventoryData[];
}

export const InventoryTable = (props: IInventoryTableProps): ReactElement => {
    // props
    const { inventoryProducts } = props;

    // handlers
    const editItemClickHandler = () => () => {
        console.log('Edit Clicked');
    };
    const deleteItemClickHandler = () => () => {
        console.log('Delete Clicked');
    };

    // table props
    const tableProps: ITableProps<IInventoryData> = {
        data: rawClone(inventoryProducts),
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
        collapsedContentRenderer: CustomCollapsedContentRenderer,
    };

    // draw
    return <Table {...tableProps} />;
};
