import Icon from '@iconify/react';
import { IconButton, ITableCell, ToolTip } from '@sellerspot/universal-components';
import React from 'react';
import { ICONS } from 'utilities/icons/icons';
import { ITaxGroupsTableProps } from './TaxGroupsTable';
import styles from './TaxGroupsTable.module.scss';

export class TaxGroupsTableService {
    static tableHeaders: ITableCell[] = [
        {
            content: 'Name',
            align: 'left',
            width: '46%',
        },
        {
            content: 'No.Of Taxes',
            align: 'right',
            width: '12%',
        },
        {
            content: 'Tax Group Rate',
            align: 'right',
            width: '14%',
        },
        {
            content: 'Number of Products',
            align: 'right',
            width: '18%',
        },
        {
            content: '',
            align: 'left',
            width: '10%',
        },
    ];

    static tableCells = (props: {
        tableItem: ITaxGroupsTableProps['tableItems'][0];
    }): ITableCell[] => {
        const { tableItem } = props;
        const {
            deleteItemCallback,
            editItemCallback,
            name,
            noOfProducts,
            noOfTaxes,
            taxGroupRate,
        } = tableItem;
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
            },
            {
                content: <span className={styles.textContent}>{noOfTaxes}</span>,
                align: 'right',
            },
            {
                content: <span className={styles.textContent}>{taxGroupRate}</span>,
                align: 'right',
            },
            {
                content: noOfProducts,
                align: 'right',
            },
            {
                content: rowActions,
                align: 'left',
            },
        ];
    };

    static taxBracketsGroupedTableHeaders: ITableCell[] = [
        {
            content: 'Tax Bracket',
            align: 'left',
            width: '90%',
        },
        {
            content: 'Rate',
            align: 'right',
            width: '10%',
        },
    ];
    static taxBracketsGroupedTableCells = (
        bracket: ITaxGroupsTableProps['tableItems'][0]['brackets'][0],
    ): ITableCell[] => {
        const { bracketName, rate } = bracket;
        return [
            {
                content: bracketName,
                align: 'left',
            },
            {
                content: rate,
                align: 'right',
            },
        ];
    };
}
