import { ITableCell } from '@sellerspot/universal-components';

export class StandardDataViewTable {
    static tableHeaders: ITableCell[] = [
        {
            content: 'Name',
            align: 'left',
            width: '40%',
        },
        {
            content: 'Description',
            align: 'left',
            width: '40%',
        },
        {
            content: 'No.of Products',
            align: 'right',
            width: '10%',
        },
        {
            content: '',
            align: 'left',
            width: '10%',
        },
    ];
}
