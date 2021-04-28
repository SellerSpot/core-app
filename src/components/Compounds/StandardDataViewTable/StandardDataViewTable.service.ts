import { ITableCell } from '@sellerspot/universal-components';

export class StandardDataViewTableService {
    static tableHeaders: ITableCell[] = [
        {
            content: 'Name',
            align: 'left',
            width: '30%',
        },
        {
            content: 'Description',
            align: 'left',
            width: '50%',
        },
        {
            content: 'Products',
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
