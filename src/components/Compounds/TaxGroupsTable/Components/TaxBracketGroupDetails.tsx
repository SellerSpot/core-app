import { ITableProps, Table } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import styles from '../TaxGroupsTable.module.scss';
import { ITaxBracket } from '../TaxGroupsTable.types';

export const TaxBracketGroupDetails = (props: { brackets: ITaxBracket[] }): ReactElement => {
    // props
    const { brackets } = props;

    // compute
    const tableProps: ITableProps<ITaxBracket> = {
        data: brackets,
        shape: [
            {
                dataKey: 'bracketName',
                columnName: 'Tax Bracket',
                align: 'left',
                width: '90%',
            },
            {
                dataKey: 'rate',
                columnName: 'Rate',
                align: 'right',
                width: '10%',
            },
        ],
    };

    // draw
    return (
        <div className={styles.taxBracketGrouped}>
            <Table {...tableProps} />
        </div>
    );
};
