import { ITableCell } from '@sellerspot/universal-components';
import { ISalesHistoryTableProps } from './SalesHistoryTable.types';

export class SalesHistoryService {
    static headers: ITableCell[] = [
        {
            content: 'Sale Time',
            width: '20%',
        },
        {
            content: 'Customer',
            width: '29%',
        },
        {
            content: 'Cashier',
            width: '29%',
        },
        {
            content: 'Sale Total',
            align: 'right',
            width: '20%',
        },
        {
            content: 'Status',
            width: '12%',
        },
    ];

    static getCells = (
        sale: Omit<ISalesHistoryTableProps['saleHistory'][0], 'products'>,
    ): ITableCell[] => {
        const { cashier, customer, saleTime, saleTotal, status } = sale;
        return [
            {
                content: saleTime,
            },
            {
                content: customer,
            },
            {
                content: cashier,
            },
            {
                content: saleTotal,
                align: 'right',
            },
            {
                content: status,
            },
        ];
    };
}
