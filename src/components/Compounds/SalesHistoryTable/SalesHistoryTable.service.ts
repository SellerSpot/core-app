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
            width: '25%',
        },
        {
            content: 'Cashier',
            width: '25%',
        },
        {
            content: 'Sale Total',
            align: 'right',
            width: '20%',
        },
        {
            content: 'Status',
            width: '10%',
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

    static productsTableHeaders: ITableCell[] = [
        {
            content: 'S.No',
            align: 'right',
        },
        {
            content: 'Product',
        },
        {
            content: 'Quantity',
            align: 'right',
        },
        {
            content: 'Unit Price',
            align: 'right',
        },
        {
            content: 'Tax',
            align: 'right',
        },
        {
            content: 'Sub-Total',
            align: 'right',
        },
    ];

    static getProductTableCells = (
        product: ISalesHistoryTableProps['saleHistory'][0]['products'][0],
        productIndex: number,
    ): ITableCell[] => {
        const { productName, quantity, subTotal, taxAmount, unitPrice } = product;
        return [
            {
                content: productIndex + 1,
                align: 'right',
            },
            {
                content: productName,
            },
            {
                content: quantity,
                align: 'right',
            },
            {
                content: unitPrice,
                align: 'right',
            },
            {
                content: taxAmount,
                align: 'right',
            },
            {
                content: subTotal,
                align: 'right',
            },
        ];
    };
}
