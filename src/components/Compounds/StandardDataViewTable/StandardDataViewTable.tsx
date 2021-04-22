import {
    IconButton,
    ITableCell,
    ITableProps,
    ITableRow,
    Table,
    ToolTip,
} from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons';
import { StandardDataViewTableService } from './StandardDataViewTable.service';
import { IStandardDataViewTableProps } from './StandardDataViewTable.types';
export { IStandardDataViewTableProps } from './StandardDataViewTable.types';
import styles from './StandardDataViewTable.module.scss';

// assembles the cell data for the table
const getCells = (props: {
    tableItem: IStandardDataViewTableProps['tableItems'][0];
}): ITableCell[] => {
    const { tableItem } = props;
    const { deleteItemCallback, description, editItemCallback, name, noOfProducts } = tableItem;
    const rowActions = (
        <div className={styles.rowActions}>
            <ToolTip content={'Edit'}>
                <div>
                    <IconButton
                        icon={<ICONS.MdModeEdit />}
                        size={'small'}
                        theme={'primary'}
                        onClick={editItemCallback}
                    />
                </div>
            </ToolTip>
            <ToolTip content={'Delete'}>
                <div>
                    <IconButton
                        icon={<ICONS.MdDelete />}
                        size={'small'}
                        theme={'danger'}
                        onClick={deleteItemCallback}
                    />
                </div>
            </ToolTip>
        </div>
    );
    return [
        {
            content: <span className={styles.textContent}>{name}</span>,
            align: 'left',
            width: '30%',
        },
        {
            content: <span className={styles.textContent}>{description}</span>,
            align: 'left',
            width: '50%',
        },
        {
            content: noOfProducts,
            align: 'right',
            width: '10%',
        },
        {
            content: rowActions,
            align: 'left',
            width: '10%',
        },
    ];
};

// assembles the body content for the table
const getTableBody = (props: {
    tableItems: IStandardDataViewTableProps['tableItems'];
    toggleRowExpansion: (rowIndex: number) => void;
}): ITableRow[] => {
    const { tableItems } = props;
    return tableItems.map(
        (tableItem): ITableRow => {
            return {
                cells: getCells({
                    tableItem,
                }),
            };
        },
    );
};

export const StandardDataViewTable = (props: IStandardDataViewTableProps): ReactElement => {
    const { tableItems } = props;

    const tableBody: ITableProps['body'] = ({ toggleRowExpansion }) => {
        return getTableBody({
            tableItems,
            toggleRowExpansion,
        });
    };

    return (
        <Table stickyHeader headers={StandardDataViewTableService.tableHeaders} body={tableBody} />
    );
};
