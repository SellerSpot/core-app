import { ITableCell } from '@sellerspot/universal-components';

export class SalesHistoryService {
    static headers: ITableCell[] = [
        {
            content: 'Sale Time',
        },
        {
            content: 'Customer',
        },
        {
            content: 'Cashier',
        },
        {
            content: 'Sale Total',
        },
        {
            content: 'Status',
        },
    ];
}
