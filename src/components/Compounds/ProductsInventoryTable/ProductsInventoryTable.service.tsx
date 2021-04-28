import { ITableCell, Switch } from '@sellerspot/universal-components';
import React from 'react';
import { IProductsInventoryTableProps } from './ProductsInventoryTable';

export class ProductsInventoryTableService {
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

    static tableCells = (product: IProductsInventoryTableProps['products'][0]): ITableCell[] => {
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

    static outletTableHeaders: ITableCell[] = [
        {
            content: 'Outlet',
        },
        {
            content: 'Supply Price',
        },
        {
            content: 'Retail Price',
        },
        {
            content: 'Stock Available',
        },
    ];

    static outletTableCell = (
        outletDetails: IProductsInventoryTableProps['products'][0]['outlets'][0],
    ): ITableCell[] => {
        const { outlet, sellingPrice, stockAvailable, supplyPrice } = outletDetails;
        return [
            {
                content: outlet,
            },
            {
                content: supplyPrice,
            },
            {
                content: sellingPrice,
            },
            {
                content: stockAvailable,
            },
        ];
    };
}
