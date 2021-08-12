import React, { ReactElement } from 'react';
import { ITableProps, Table } from '@sellerspot/universal-components';
import { IInventoryData } from '@sellerspot/universal-types';

interface IInventoryTableProps {
    inventory: IInventoryData[];
}

export const InventoryTable = (props: IInventoryTableProps): ReactElement => {
    // props
    const { inventory } = props;

    // // handlers
    // const editItemClickHandler = () => () => {
    //     console.log('Edit Clicked');
    // };
    // const deleteItemClickHandler = () => () => {
    //     console.log('Delete Clicked');
    // };

    // table props
    const tableProps: ITableProps = {
        data: inventory,
        shape: [
            {
                columnName: 'S.No',
                align: 'center',
                width: '60px',
                // customRenderer: SnoCustomRenderer,
            },
            {
                columnName: 'Product',
                align: 'left',
                // customRenderer: ProductCustomRenderer,
            },
            {
                columnName: 'Category',
                width: '120px',
                align: 'center',
                // customRenderer: CategoryCustomRenderer,
            },
            {
                columnName: 'Stock',
                align: 'center',
                width: '120px',
                // customRenderer: StockAvailableCustomRenderer,
            },
            {
                columnName: 'MRP',
                align: 'center',
                width: '120px',
                // customRenderer: MRPCustomRenderer,
            },
            {
                columnName: 'Active',
                align: 'center',
                width: '120px',
                // customRenderer: ActiveCustomRenderer,
            },
            {
                columnName: 'Actions',
                align: 'center',
                width: '100px',
                // customRenderer: ActionsCustomRenderer({
                //     deleteItemClickHandler,
                //     editItemClickHandler,
                // }),
            },
        ],
    };

    // draw
    return <Table {...tableProps} />;
};
