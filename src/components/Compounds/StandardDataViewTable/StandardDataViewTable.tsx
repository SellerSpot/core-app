import Icon from '@iconify/react';
import {
    IconButton,
    ITableCell,
    ITableProps,
    ITableRow,
    Table,
    ToolTip,
} from '@sellerspot/universal-components';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { ICONS } from 'utilities/icons/icons';
import styles from './StandardDataViewTable.module.scss';
import { StandardDataViewTableService } from './StandardDataViewTable.service';
import { IStandardDataViewTableProps } from './StandardDataViewTable.types';

export { IStandardDataViewTableProps } from './StandardDataViewTable.types';

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
                        icon={<Icon icon={ICONS.baselineEdit} />}
                        size={'small'}
                        theme={'primary'}
                        onClick={editItemCallback}
                    />
                </div>
            </ToolTip>
            <ToolTip content={'Delete'}>
                <div>
                    <IconButton
                        icon={<Icon icon={ICONS.outlineDeleteOutline} />}
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
            width: '26%',
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
    return tableItems.map((tableItem): ITableRow => {
        return {
            cells: getCells({
                tableItem,
            }),
        };
    });
};

export const StandardDataViewTable = (props: IStandardDataViewTableProps): ReactElement => {
    const { tableItems, isLoading } = props;
    const [containerHeight, setContainerHeight] = useState(500);
    const tableContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!!tableContainerRef) {
            setContainerHeight(tableContainerRef.current.clientHeight);
        }
    }, [tableContainerRef]);

    const tableDataBody: ITableProps['body'] = ({ toggleRowExpansion }) => {
        return getTableBody({
            tableItems,
            toggleRowExpansion,
        });
    };

    const tableSkeletonBody: ITableProps['body'] = () => {
        return StandardDataViewTableService.getTableSkeletonBody(containerHeight);
    };

    const tableBody = isLoading ? tableSkeletonBody : tableDataBody;

    return (
        <div ref={tableContainerRef} className={styles.tableWrapper}>
            <Table
                height={containerHeight}
                stickyHeader
                headers={StandardDataViewTableService.tableHeaders}
                body={tableBody}
            />
        </div>
    );
};
