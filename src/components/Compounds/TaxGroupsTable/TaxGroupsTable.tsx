import Icon from '@iconify/react';
import {
    ITableCollapsedCustomRenderer,
    ITableProps,
    Table,
    ToolTip,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import { TaxBracketGroupDetails } from './Components/TaxBracketGroupDetails';
import styles from './TaxGroupsTable.module.scss';
import { ITaxGroup, ITaxGroupsTableProps } from './TaxGroupsTable.types';

export { ITaxGroupsTableProps } from './TaxGroupsTable.types';

export const TaxGroupsTable = (props: ITaxGroupsTableProps): ReactElement => {
    // props
    const { taxGroups } = props;

    // compute
    const CollapsedContent: ITableCollapsedCustomRenderer<ITaxGroup> = (props) => {
        // props
        const { rowData } = props;
        return TaxBracketGroupDetails({ brackets: rowData['brackets'] });
    };
    const Actions: TTableCellCustomRenderer<ITaxGroup> = (props) => {
        // props
        const {} = props;
        return (
            <div className={styles.rowActions}>
                <ToolTip content={'Edit'}>
                    <div>
                        <Icon
                            className={styles.rowActionsEditIcon}
                            height={'18px'}
                            icon={ICONS.baselineEdit}
                        />
                    </div>
                </ToolTip>
                <ToolTip content={'Delete'}>
                    <div>
                        <Icon
                            className={styles.rowActionsDeleteIcon}
                            height={'18px'}
                            icon={ICONS.outlineDeleteOutline}
                        />
                    </div>
                </ToolTip>
            </div>
        );
    };
    const tableProps: ITableProps<ITaxGroup> = {
        data: taxGroups,
        shape: [
            {
                dataKey: 'name',
                columnName: 'Name',
                align: 'left',
                width: '40%',
            },
            {
                dataKey: 'noOfTaxes',
                columnName: 'No.Of Taxes',
                align: 'right',
            },
            {
                dataKey: 'taxGroupRate',
                columnName: 'Tax Group Rate',
                align: 'right',
            },
            {
                dataKey: 'noOfProducts',
                columnName: 'Number of Products',
                align: 'right',
            },
            {
                columnName: 'Actions',
                align: 'center',
                customRenderer: Actions,
            },
        ],
        collapsedContentRenderer: CollapsedContent,
    };

    return <Table {...tableProps} />;
};
