import { State } from '@hookstate/core';
import { ITableProps, Table } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { IInventoryData } from '@sellerspot/universal-types';
import {
    LandingCostCustomRenderer,
    MarkupCustomRenderer,
    MRPCustomRenderer,
    OutletCustomRenderer,
    StockCustomRenderer,
} from './Components/CustomRenderers';

interface IInventoryModalTableProps {
    inventoryData: State<IInventoryData[]>;
}

export const InventoryModalTable = (props: IInventoryModalTableProps): ReactElement => {
    // props
    const { inventoryData } = props;

    // table props
    const tableProps: ITableProps<IInventoryData> = {
        data: inventoryData.get(),
        stickyHeader: true,
        shape: [
            {
                columnName: 'Outlet',
                align: 'left',
                width: '150px',
                customRenderer: OutletCustomRenderer,
            },
            {
                columnName: 'Stock',
                align: 'center',
                customRenderer: StockCustomRenderer(inventoryData),
            },
            {
                columnName: 'Landing Cost',
                align: 'center',
                customRenderer: LandingCostCustomRenderer(inventoryData),
            },
            {
                columnName: 'Markup',
                align: 'center',
                customRenderer: MarkupCustomRenderer(inventoryData),
            },
            {
                columnName: 'M.R.P',
                align: 'center',
                customRenderer: MRPCustomRenderer(inventoryData),
            },
        ],
    };

    // return
    return <Table {...tableProps} />;
};
