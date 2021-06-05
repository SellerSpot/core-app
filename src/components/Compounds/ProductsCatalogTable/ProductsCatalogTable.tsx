import {
    ITableProps,
    Switch,
    Table,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { IProduct, IProductsCatalogTableProps } from './ProductsCatalogTable.types';
export { IProductsCatalogTableProps } from './ProductsCatalogTable.types';

export const ProductsCatalogTable = (props: IProductsCatalogTableProps): ReactElement => {
    // props
    const { products } = props;

    // compute
    const ActiveComponent: TTableCellCustomRenderer<IProduct> = (props) => {
        const { rowData } = props;
        const { active } = rowData;
        return <Switch checked={active} theme="primary" />;
    };
    const tableProps: ITableProps<IProduct> = {
        data: products,
        shape: [
            {
                dataKey: 'productName',
                columnName: 'Product',
                width: '40%',
            },
            {
                dataKey: 'category',
                columnName: 'Category',
            },
            {
                dataKey: 'availableStock',
                columnName: 'Stock Available',
            },
            {
                dataKey: 'sellingPrice',
                columnName: 'Selling Price',
            },
            {
                dataKey: 'active',
                columnName: 'Active',
                customRenderer: ActiveComponent,
            },
        ],
    };

    return <Table {...tableProps} />;
};
