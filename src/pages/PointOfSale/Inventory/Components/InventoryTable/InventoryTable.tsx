import React, { ReactElement } from 'react';
import { ITableProps, Table } from '../../../../../../.yalc/@sellerspot/universal-components/dist';
import { IInventoryData } from '../../../../../../.yalc/@sellerspot/universal-types/dist';
import {
    ActiveCustomRenderer,
    CategoryCustomRenderer,
    MRPCustomRenderer,
    ProductCustomRenderer,
    SnoCustomRenderer,
    StockAvailableCustomRenderer,
} from './Components/CustomRenderers';

interface IInventoryTableProps {
    inventory: IInventoryData[];
}

export const InventoryTable = (props: IInventoryTableProps): ReactElement => {
    // props
    const { inventory } = props;

    // table props
    const tableProps: ITableProps = {
        data: inventory,
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
                columnName: 'Category',
                width: '120px',
                align: 'center',
                customRenderer: CategoryCustomRenderer,
            },
            {
                columnName: 'Stock',
                align: 'center',
                width: '120px',
                customRenderer: StockAvailableCustomRenderer,
            },
            {
                columnName: 'MRP',
                align: 'center',
                width: '120px',
                customRenderer: MRPCustomRenderer,
            },
            {
                columnName: 'Active',
                align: 'center',
                width: '120px',
                customRenderer: ActiveCustomRenderer,
            },
        ],
    };

    // draw
    return <Table {...tableProps} />;
};
