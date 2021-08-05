import Icon from '@iconify/react';
import {
    IconButton,
    ITableCollapsedCustomRenderer,
    ITableProps,
    Table,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { saleService } from 'services/services';
import { cartSelector } from 'store/models/cart';
import { numberFormatINRCurrency } from 'utilities/general';
import { ICONS } from 'utilities/utilities';
import { useTheme } from '../../../../../customHooks/useTheme';
import { ICartTableProduct } from './CartTable.types';
import { CartTableCollapsedContent } from './Components/CartTableCollapsedContent';

export default function CartTable(): ReactElement {
    // state
    const { productsData } = useSelector(cartSelector);

    // hooks
    const { colors } = useTheme();

    // compute
    const collapsedContentRenderer: ITableCollapsedCustomRenderer<ICartTableProduct> = (props) => {
        const { rowData, rowIndex, toggleRowExpansion } = props;
        return (
            <CartTableCollapsedContent
                product={rowData}
                productIndex={rowIndex}
                toggleRowExpansion={toggleRowExpansion}
            />
        );
    };

    const SNoField: TTableCellCustomRenderer<ICartTableProduct> = (props) => {
        const { rowIndex } = props;
        return rowIndex + 1;
    };

    const subTotalRenderer: TTableCellCustomRenderer<ICartTableProduct> = (props) => {
        const { rowData } = props;
        const { discountPercent, quantity, taxBrackets, unitPrice } = rowData;
        return numberFormatINRCurrency(
            saleService.computeProductSubTotal({
                discountPercent,
                quantity,
                taxBrackets,
                unitPrice,
            }),
        );
    };

    const pricePerUnitRenderer: TTableCellCustomRenderer<ICartTableProduct> = (props) => {
        const { rowData } = props;
        const { unitPrice } = rowData;
        return numberFormatINRCurrency(unitPrice);
    };

    const Action: TTableCellCustomRenderer<ICartTableProduct> = (props) => {
        const {} = props;
        return (
            <IconButton
                icon={<Icon icon={ICONS.outlineDeleteOutline} />}
                theme="danger"
                size="small"
            />
        );
    };
    const tableProps: ITableProps<ICartTableProduct> = {
        data: productsData,
        shape: [
            // 5% left for expand row down arrow
            {
                columnName: 'S.No',
                width: '5%',
                align: 'center',
                customRenderer: SNoField,
            },
            {
                dataKey: 'productName',
                columnName: 'Product',
                width: '40%',
                align: 'left',
            },
            {
                dataKey: 'quantity',
                columnName: 'Qty',
                width: '5%',
                align: 'right',
            },
            {
                columnName: 'Price \n /unit',
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
                columnName: '',
                width: '5%',
                align: 'right',
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
}
