import { ITableProps, Table } from '@sellerspot/universal-components';
import { IOutletData } from '@sellerspot/universal-types';
import React, { ReactElement } from 'react';
import {
    LandingCostCustomRenderer,
    MarkupCustomRenderer,
    MRPCustomRenderer,
    OutletCustomRenderer,
    StockCustomRenderer,
    TaxSettingCustomRenderer,
} from './Components/CustomRenderers';

interface IInventoryModalTableProps {
    allOutlets: IOutletData[];
}

export const InventoryModalTable = (props: IInventoryModalTableProps): ReactElement => {
    // props
    const { allOutlets } = props;

    // table props
    const tableProps: ITableProps<IOutletData> = {
        data: allOutlets,
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
                customRenderer: StockCustomRenderer,
            },
            {
                columnName: 'Landing Cost',
                align: 'center',
                customRenderer: LandingCostCustomRenderer,
            },
            {
                columnName: 'Markup',
                align: 'center',
                customRenderer: MarkupCustomRenderer,
            },
            {
                columnName: 'M.R.P',
                align: 'center',
                customRenderer: MRPCustomRenderer,
            },
            {
                columnName: 'Tax Setting',
                align: 'center',
                width: '200px',
                customRenderer: TaxSettingCustomRenderer,
            },
        ],
    };

    // return
    return <Table {...tableProps} />;
};
