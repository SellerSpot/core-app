import { ITableProps, ITableRow, Table } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { ProductsCatalogDetails } from './Components/ProductsCatalogDetails';
import { ProductsCatalogService } from './ProductsCatalog.service';
import { IProductsCatalogTableProps } from './ProductsCatalogTable.types';
export { IProductsCatalogTableProps } from './ProductsCatalogTable.types';

const getTableBody = (props: {
    toggleRowExpansion: (rowIndex: number) => void;
    products: IProductsCatalogTableProps['products'];
}): ITableRow[] => {
    const { products, toggleRowExpansion } = props;
    return products.map((product, productIndex) => {
        return {
            cells: ProductsCatalogService.tableCells(product),
            onClick: () => toggleRowExpansion(productIndex),
            collapsedContent: <ProductsCatalogDetails product={product} />,
        };
    });
};

export const ProductsCatalogTable = (props: IProductsCatalogTableProps): ReactElement => {
    const { products } = props;

    const tableBody: ITableProps['body'] = ({ toggleRowExpansion }) => {
        return getTableBody({
            products,
            toggleRowExpansion,
        });
    };

    return (
        <Table
            headers={ProductsCatalogService.tableHeaders}
            height={500}
            hasExpandableRows
            body={tableBody}
        />
    );
};
