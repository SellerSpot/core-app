import { ITableCell, Switch } from '@sellerspot/universal-components';
import React from 'react';
import { IProductsCatalogTableProps } from './ProductsCatalogTable';

export class ProductsCatalogService {
    static tableHeaders: ITableCell[] = [
        {
            content: 'Product',
        },
        {
            content: 'Category',
        },
        {
            content: 'Stock Available',
        },
        {
            content: 'Selling Price',
        },
        {
            content: 'Active',
        },
    ];

    static tableCells = (product: IProductsCatalogTableProps['products'][0]): ITableCell[] => {
        const { active, availableStock, category, productName, sellingPrice } = product;
        return [
            {
                content: productName,
            },
            {
                content: category,
            },
            {
                content: availableStock,
            },
            {
                content: sellingPrice,
            },
            {
                content: <Switch checked={active} />,
            },
        ];
    };
}
