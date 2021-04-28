import { ITableProps, ITableRow, Table } from '@sellerspot/universal-components';
import { omit } from 'lodash';
import React, { ReactElement } from 'react';
import { SalesHistoryDetails } from './Components/SalesHistoryDetails';
import { SalesHistoryService } from './SalesHistoryTable.service';
import { ISalesHistoryTableProps } from './SalesHistoryTable.types';

export { ISalesHistoryTableProps } from './SalesHistoryTable.types';

const getTableBody = (props: {
    toggleRowExpansion: (rowIndex: number) => void;
    saleHistory: ISalesHistoryTableProps['saleHistory'];
}): ITableRow[] => {
    const { saleHistory, toggleRowExpansion } = props;
    return saleHistory.map((sale, saleIndex) => {
        const handleRowOnClick = () => {
            toggleRowExpansion(saleIndex);
        };

        return {
            cells: SalesHistoryService.getCells(omit(sale, 'products')),
            onClick: handleRowOnClick,
            collapsedContent: <SalesHistoryDetails sale={sale} />,
        };
    });
};

export const SalesHistoryTable = (props: ISalesHistoryTableProps): ReactElement => {
    const { saleHistory } = props;
    const tableBody: ITableProps['body'] = ({ toggleRowExpansion }) => {
        return getTableBody({
            saleHistory,
            toggleRowExpansion,
        });
    };

    return (
        <Table
            height={700}
            hasExpandableRows
            unmountOnCollapse
            stickyHeader
            headers={SalesHistoryService.headers}
            body={tableBody}
        />
    );
};
