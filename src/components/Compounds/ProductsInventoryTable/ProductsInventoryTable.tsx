import { ITableProps, ITableRow, Table } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { ProductsInventoryDetails } from './Components/ProductsInventoryDetails';
import { ProductsInventoryTableService } from './ProductsInventoryTable.service';
import { IProductsInventoryTableProps } from './ProductsInventoryTable.types';
export { IProductsInventoryTableProps } from './ProductsInventoryTable.types';

const getTableBody = (props: {
    toggleRowExpansion: (rowIndex: number) => void;
    products: IProductsInventoryTableProps['products'];
}): ITableRow[] => {
    const { products, toggleRowExpansion } = props;
    return products.map((product, productIndex) => {
        return {
            cells: ProductsInventoryTableService.tableCells(product),
            onClick: () => toggleRowExpansion(productIndex),
            collapsedContent: <ProductsInventoryDetails product={product} />,
        };
    });
};

export const ProductsInventoryTable = (props: IProductsInventoryTableProps): ReactElement => {
    const { products } = props;

    const tableBody: ITableProps['body'] = ({ toggleRowExpansion }) => {
        return getTableBody({
            products,
            toggleRowExpansion,
        });
    };

    return (
        <Table
            headers={ProductsInventoryTableService.tableHeaders}
            height={500}
            hasExpandableRows
            body={tableBody}
        />
    );
};
