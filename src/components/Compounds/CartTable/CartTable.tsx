import {
    IconButton,
    ITableCell,
    ITableRow,
    Table,
    ToolTip,
} from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { cartSelector, removeProductFromCart } from 'store/models/cart';
import { store } from 'store/store';
import { computeProductSubTotal } from 'utilities/businessLogic';
import { numberFormatINRCurrency } from 'utilities/general';
import { ICONS } from 'utilities/icons';

import styles from './CartTable.module.scss';
import { ICartProductsData } from './CartTable.types';
import { CollapsedContent } from './Components/CollapsedContent';

const getTableCells = (product: ICartProductsData, productIndex: number): ITableCell[] => {
    const { productName, quantity, discountPercent, taxBrackets, unitPrice } = product;
    return [
        {
            content: productIndex + 1,
            align: 'right',
        },
        {
            content: (
                <ToolTip content={productName.length > 30 ? productName : ''}>
                    {<h6 className={styles.productNameText}>{productName}</h6>}
                </ToolTip>
            ),
        },
        {
            content: quantity,
            align: 'right',
        },
        {
            content: numberFormatINRCurrency(
                computeProductSubTotal({
                    discountPercent,
                    quantity,
                    taxBrackets,
                    unitPrice,
                }),
            ),
            align: 'right',
        },
        {
            content: (
                <IconButton
                    icon={<ICONS.MdClear />}
                    theme={'danger'}
                    size={'small'}
                    onClick={() => {
                        store.dispatch(
                            removeProductFromCart({
                                productIndex,
                            }),
                        );
                    }}
                />
            ),
            padding: 'none',
            align: 'left',
        },
    ];
};

const tableHeaders: ITableCell[] = [
    {
        content: 'S.No',
        width: '5%',
        align: 'left',
    },
    {
        content: 'Product',
        width: '55%',
        align: 'left',
    },
    {
        content: 'Qty',
        width: '5%',
        align: 'right',
    },
    {
        content: 'Sub-Total',
        width: '25%',
        align: 'right',
    },
    {
        content: '',
        width: '5%',
        align: 'right',
    },
];

const getTableBody = (products: ICartProductsData[]): ITableRow[] => {
    return products.map((product, productIndex) => {
        return {
            cells: getTableCells(product, productIndex),
            collapsedContent: (toggleRowExpansion) => {
                return CollapsedContent({
                    product,
                    productIndex,
                    toggleRowExpansion,
                });
            },
        };
    });
};

export default function CartTable(): ReactElement {
    const { productsData } = useSelector(cartSelector);
    return (
        <Table
            hasExpandableRows={true}
            headers={tableHeaders}
            stickyHeader={true}
            body={getTableBody(productsData)}
        />
    );
}
