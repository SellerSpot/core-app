import { ICONS } from 'utilities/icons';
import { numberFormatINRCurrency } from 'utilities/general';
import { store } from 'store/store';
import { cartSelector, removeProductFromCart } from 'store/models/cart';
import { useSelector } from 'react-redux';
import React, { ReactElement } from 'react';
import {
    IconButton,
    ITableCell,
    ITableProps,
    ITableRow,
    Table,
    ToolTip,
} from '@sellerspot/universal-components';
import { CartTableCollapsedContent } from './Components/CartTableCollapsedContent';
import { ICartTableProduct } from './CartTable.types';
import { CartTableService } from './CartTable.service';
import styles from './CartTable.module.scss';
import { saleService } from 'services/services';

const getTableCells = (product: ICartTableProduct, productIndex: number): ITableCell[] => {
    const { productName, quantity, discountPercent, taxBrackets, unitPrice } = product;
    const deleteProductOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // to stop the row from also being clicked
        event.stopPropagation();
        store.dispatch(
            removeProductFromCart({
                productIndex,
            }),
        );
    };
    const productSubTotal = numberFormatINRCurrency(
        saleService.computeProductSubTotal({
            discountPercent,
            quantity,
            taxBrackets,
            unitPrice,
        }),
    );
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
            content: productSubTotal,
            align: 'right',
        },
        {
            content: (
                <ToolTip content={'Remove Product'}>
                    <div>
                        <IconButton
                            icon={<ICONS.MdClear />}
                            theme="danger"
                            size="small"
                            onClick={deleteProductOnClick}
                        />
                    </div>
                </ToolTip>
            ),
            padding: 'none',
            align: 'left',
        },
    ];
};

const getTableBody = (
    products: ICartTableProduct[],
    toggleRowExpansion: (rowIndex: number) => void,
): ITableRow[] => {
    return products.map((product, productIndex) => {
        const handleRowOnClick = () => {
            toggleRowExpansion(productIndex);
        };

        return {
            cells: getTableCells(product, productIndex),
            onClick: handleRowOnClick,
            collapsedContent: (
                <CartTableCollapsedContent
                    product={product}
                    productIndex={productIndex}
                    toggleRowExpansion={toggleRowExpansion}
                />
            ),
        };
    });
};

export default function CartTable(): ReactElement {
    const { productsData } = useSelector(cartSelector);

    const tableBody: ITableProps['body'] = ({ toggleRowExpansion }) => {
        return getTableBody(productsData, toggleRowExpansion);
    };

    return (
        <Table
            hasExpandableRows
            headers={CartTableService.tableHeaders}
            stickyHeader
            body={tableBody}
        />
    );
}
