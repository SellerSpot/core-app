import React, { ReactElement } from 'react';
import { ITableProps } from '@sellerspot/universal-components';
import { ITableRow, Table } from '@sellerspot/universal-components';
import { ISalesHistoryTableProps } from './SalesHistoryTable.types';
import { SalesHistoryService } from './SalesHistoryTable.service';
// import styles from './SalesHistoryTable.module.scss';

export { ISalesHistoryTableProps } from './SalesHistoryTable.types';

const getTableBody = (): ITableRow[] => {
    return [
        {
            cells: [
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
            ],
            collapsedContent: <div>Hi there</div>,
        },
    ];
};

export const SalesHistoryTable = (props: ISalesHistoryTableProps): ReactElement => {
    const {} = props;
    const tableBody: ITableProps['body'] = ({}) => {
        return getTableBody();
    };

    return <Table hasExpandableRows headers={SalesHistoryService.headers} body={tableBody} />;
};
