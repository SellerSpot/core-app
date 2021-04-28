import { ITableProps, ITableRow, Table } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { TaxGroupsTableService } from '../TaxGroupsTable.service';
import { ITaxGroupsTableProps } from '../TaxGroupsTable.types';
import styles from '../TaxGroupsTable.module.scss';

const getTableBody = (brackets: ITaxGroupsTableProps['tableItems'][0]['brackets']): ITableRow[] => {
    return brackets.map((bracket) => {
        return {
            cells: TaxGroupsTableService.taxBracketsGroupedTableCells(bracket),
        };
    });
};

export const TaxBracketsGrouped = (props: {
    brackets: ITaxGroupsTableProps['tableItems'][0]['brackets'];
}): ReactElement => {
    const { brackets } = props;
    const tableBody: ITableProps['body'] = () => {
        return getTableBody(brackets);
    };

    return (
        <div className={styles.taxBracketGrouped}>
            <Table
                headers={TaxGroupsTableService.taxBracketsGroupedTableHeaders}
                body={tableBody}
                variant="simple"
                size="small"
                maxHeight={200}
            />
        </div>
    );
};
