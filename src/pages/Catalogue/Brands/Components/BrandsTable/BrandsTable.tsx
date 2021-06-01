import Icon from '@iconify/react';
import {
    IconButton,
    ITableCell,
    ITableProps,
    ITableRow,
    Table,
    ToolTip,
} from '@sellerspot/universal-components';
import { IBrandData } from '@sellerspot/universal-types';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { ICONS } from 'utilities/utilities';
import styles from './BrandsTable.module.scss';
import { StandardDataViewTableService } from './BrandsTable.service';
import { IBrandsTableProps } from './BrandsTable.types';

export { IBrandsTableProps } from './BrandsTable.types';

// assembles the cell data for the table
const getCells = (props: {
    tableItem: IBrandData;
    tableItemIndex: number;
    deleteItemCallback: IBrandsTableProps['deleteItemCallback'];
    editItemCallback: IBrandsTableProps['editItemCallback'];
}): ITableCell[] => {
    const { tableItem, tableItemIndex, deleteItemCallback, editItemCallback } = props;
    const { name, id } = tableItem;

    const editItemClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        editItemCallback(event, tableItemIndex);
    };

    const deleteItemClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        deleteItemCallback(event, tableItemIndex);
    };

    const rowActions = (
        <div className={styles.rowActions}>
            <span className={styles.link}>View Products</span>
            <div className={styles.minActions}>
                <ToolTip content={'Edit'}>
                    <div>
                        <IconButton
                            icon={<Icon icon={ICONS.baselineEdit} />}
                            size={'small'}
                            theme={'primary'}
                            onClick={editItemClickHandler}
                        />
                    </div>
                </ToolTip>
                <ToolTip content={'Delete'}>
                    <div>
                        <IconButton
                            icon={<Icon icon={ICONS.outlineDeleteOutline} />}
                            size={'small'}
                            theme={'danger'}
                            onClick={deleteItemClickHandler}
                        />
                    </div>
                </ToolTip>
            </div>
        </div>
    );
    const sNoText = `${tableItemIndex + 1}.`;
    return [
        {
            content: <span className={styles.textContent}>{sNoText}</span>,
            align: 'right',
            key: `${id}sNoText`,
        },
        {
            content: <span className={styles.textContent}>{name}</span>,
            align: 'left',
            key: `${id}name`,
        },
        {
            content: rowActions,
            align: 'right',
            key: `${id}actions`,
        },
    ];
};

// assembles the body content for the table
const getTableBody = (props: {
    tableItems: IBrandData[];
    toggleRowExpansion: (rowIndex: number) => void;
    deleteItemCallback: IBrandsTableProps['deleteItemCallback'];
    editItemCallback: IBrandsTableProps['editItemCallback'];
}): ITableRow[] => {
    const { tableItems, deleteItemCallback, editItemCallback } = props;
    return tableItems.map((tableItem, tableItemIndex): ITableRow => {
        const { id } = tableItem;
        return {
            cells: getCells({
                tableItem,
                tableItemIndex,
                deleteItemCallback,
                editItemCallback,
            }),
            key: id,
        };
    });
};

export const BrandsTable = (props: IBrandsTableProps): ReactElement => {
    const { tableItems, isLoading, deleteItemCallback, editItemCallback } = props;
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
            deleteItemCallback,
            editItemCallback,
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
