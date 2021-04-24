import React, { ReactElement } from 'react';
import { omit } from 'lodash';
import { ITableProps, ITableRow, Table } from '@sellerspot/universal-components';
import { ISalesHistoryTableProps } from './SalesHistoryTable.types';
import { SalesHistoryService } from './SalesHistoryTable.service';
// import styles from './SalesHistoryTable.module.scss';

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
            collapsedContent: <div>Hi there</div>,
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
            hasExpandableRows
            unmountOnCollapse
            headers={SalesHistoryService.headers}
            body={tableBody}
        />
    );
};
