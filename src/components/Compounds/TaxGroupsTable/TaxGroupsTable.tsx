import { ITableProps, ITableRow, Table } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { TaxBracketsGrouped } from './Components/TaxBracketsGrouped';
import { TaxGroupsTableService } from './TaxGroupsTable.service';
import { ITaxGroupsTableProps } from './TaxGroupsTable.types';

export { ITaxGroupsTableProps } from './TaxGroupsTable.types';

// assembles the body content for the table
const getTableBody = (props: {
    tableItems: ITaxGroupsTableProps['tableItems'];
    toggleRowExpansion: (rowIndex: number) => void;
}): ITableRow[] => {
    const { tableItems, toggleRowExpansion } = props;
    return tableItems.map((tableItem, tableItemIndex): ITableRow => {
        const { brackets } = tableItem;
        return {
            cells: TaxGroupsTableService.tableCells({
                tableItem,
            }),
            onClick: () => toggleRowExpansion(tableItemIndex),
            collapsedContent: <TaxBracketsGrouped brackets={brackets} />,
        };
    });
};

export const TaxGroupsTable = (props: ITaxGroupsTableProps): ReactElement => {
    const { tableItems } = props;

    const tableBody: ITableProps['body'] = ({ toggleRowExpansion }) => {
        return getTableBody({
            tableItems,
            toggleRowExpansion,
        });
    };

    return (
        <Table
            stickyHeader
            hasExpandableRows
            headers={TaxGroupsTableService.tableHeaders}
            body={tableBody}
        />
    );
};
