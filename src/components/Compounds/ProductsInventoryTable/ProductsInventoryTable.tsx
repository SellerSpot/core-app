import {
    ITableCollapsedCustomRenderer,
    ITableProps,
    Switch,
    Table,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { ProductsInventoryDetails } from './Components/ProductsInventoryDetails';
import { IProduct, IProductsInventoryTableProps } from './ProductsInventoryTable.types';
export { IProductsInventoryTableProps } from './ProductsInventoryTable.types';

export const ProductsInventoryTable = (props: IProductsInventoryTableProps): ReactElement => {
    // props
    const { products } = props;

    // compute
    const ActiveComponent: TTableCellCustomRenderer<IProduct> = (props) => {
        const { rowData } = props;
        const { active } = rowData;
        return <Switch checked={active} theme="primary" />;
    };
    const CollapsedComponent: ITableCollapsedCustomRenderer<IProduct> = (props) => {
        const { rowData } = props;
        return <ProductsInventoryDetails product={rowData} />;
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
        collapsedContentRenderer: CollapsedComponent,
    };

    return <Table {...tableProps} />;
};
