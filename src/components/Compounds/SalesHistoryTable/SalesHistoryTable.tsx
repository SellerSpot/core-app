import {
    ITableCollapsedCustomRenderer,
    ITableProps,
    Table,
} from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { SalesHistoryDetails } from './Components/SalesHistoryDetails';
import { ISalesHistoryTableProps } from './SalesHistoryTable.types';

export { ISalesHistoryTableProps } from './SalesHistoryTable.types';

export const SalesHistoryTable = (props: ISalesHistoryTableProps): ReactElement => {
    // props
    const { saleHistory } = props;

    // compute
    const CollapsedComponent: ITableCollapsedCustomRenderer<
        ISalesHistoryTableProps['saleHistory'][0]
    > = (props) => {
        const { rowData } = props;
        return <SalesHistoryDetails sale={rowData} />;
    };
    const tableProps: ITableProps<ISalesHistoryTableProps['saleHistory'][0]> = {
        data: saleHistory,
        shape: [
            {
                dataKey: 'saleTime',
                columnName: 'Sale Time',
                width: '20%',
            },
            {
                dataKey: 'customer',
                columnName: 'Customer',
                width: '25%',
            },
            {
                dataKey: 'cashier',
                columnName: 'Cashier',
                width: '25%',
            },
            {
                dataKey: 'saleTotal',
                columnName: 'Sale Total',
                align: 'right',
                width: '20%',
            },
            {
                dataKey: 'status',
                columnName: 'Status',
                width: '10%',
            },
        ],
        collapsedContentRenderer: CollapsedComponent,
    };

    // draw
    return <Table {...tableProps} />;
};
