import { useState } from '@hookstate/core';
import Icon from '@iconify/react';
import {
    Button,
    IconButton,
    ITableCollapsedCustomRenderer,
    ITableProps,
    Table,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import { ICartDetails } from '@sellerspot/universal-types';
import { newSaleState } from 'pages/PointOfSale/NewSale/NewSale';
import { NewSaleService } from 'pages/PointOfSale/NewSale/NewSale.service';
import React, { ReactElement } from 'react';
import { saleService } from 'services/services';
import { numberFormatINRCurrency, rawClone } from 'utilities/general';
import { ICONS } from 'utilities/utilities';
import { useTheme } from '../../../../../../../customHooks/useTheme';
import { ICartTableProps } from './CartTable.types';
import { CartTableCollapsedContent } from './Components/CartTableCollapsedContent';

const CartTable = (props: ICartTableProps): ReactElement => {
    // props
    const { searchFieldFocusTriggerer } = props;

    // state
    const cartData = useState(newSaleState.saleData.cart);

    // hooks
    const { colors } = useTheme();

    // hanlders

    // renderer helpers
    const collapsedContentRenderer: ITableCollapsedCustomRenderer<ICartDetails> = (props) => {
        const { rowIndex, toggleRowExpansion } = props;
        return (
            <CartTableCollapsedContent
                product={cartData[rowIndex]}
                productIndex={rowIndex}
                toggleRowExpansion={toggleRowExpansion}
            />
        );
    };

    const SNoField: TTableCellCustomRenderer<ICartDetails> = (props) => {
        const { rowIndex } = props;
        return rowIndex + 1;
    };

    const productNameRenderer: TTableCellCustomRenderer<ICartDetails> = (props) => {
        const { rowData } = props;
        const {
            product: { name },
        } = rowData;
        return name;
    };

    const subTotalRenderer: TTableCellCustomRenderer<ICartDetails> = (props) => {
        const { rowData } = props;
        const { quantity, taxBracket, sellingPrice, productDiscount: discount } = rowData;

        return numberFormatINRCurrency(
            saleService.computeProductTotals({
                discount,
                quantity,
                taxBracket,
                sellingPrice,
            }).grandTotal,
        );
    };

    const pricePerUnitRenderer: TTableCellCustomRenderer<ICartDetails> = (props) => {
        const { rowData } = props;
        const { sellingPrice } = rowData;
        return numberFormatINRCurrency(sellingPrice);
    };

    const Action: TTableCellCustomRenderer<ICartDetails> = (props) => {
        const { rowIndex } = props;
        const onRemoveProductHandler = () => {
            NewSaleService.removeProductFromCart(rowIndex);
        };
        return (
            <IconButton
                icon={<Icon icon={ICONS.outlineDeleteOutline} />}
                theme="danger"
                size="small"
                onClick={onRemoveProductHandler}
            />
        );
    };

    const emptyTableCTA = () => {
        // handlers
        const onClickHandler = () => searchFieldFocusTriggerer();

        return (
            <Button
                label="Search"
                theme="primary"
                size="small"
                onClick={onClickHandler}
                variant="contained"
                startIcon={<Icon icon={ICONS.outlineSearch} />}
            />
        );
    };

    const tableProps: ITableProps<ICartDetails> = {
        data: rawClone(cartData.get()),
        emptyStateMessage: 'Search / scan and add products to the cart',
        emptyStatePrimaryCallToAction: emptyTableCTA(),
        shape: [
            // 5% left for expand row down arrow
            {
                columnName: 'S.No',
                width: '5%',
                align: 'center',
                customRenderer: SNoField,
            },
            {
                columnName: 'Product',
                width: '40%',
                align: 'left',
                customRenderer: productNameRenderer,
            },
            {
                dataKey: 'quantity',
                columnName: 'Qty',
                width: '5%',
                align: 'right',
            },
            {
                columnName: 'Unit price',
                width: '20%',
                align: 'right',
                customRenderer: pricePerUnitRenderer,
            },
            {
                columnName: 'Total',
                width: '20%',
                align: 'right',
                customRenderer: subTotalRenderer,
            },
            {
                columnName: ``,
                width: '5%',
                align: 'center',
                customRenderer: Action,
            },
        ],
        collapsedContentRenderer,
        style: {
            tableWrapper: {
                backgroundColor: colors.backgroundPrimary,
            },
            headerRow: {
                backgroundColor: colors.backgroundPrimary,
            },
        },
    };

    return <Table {...tableProps} />;
};

export default CartTable;
