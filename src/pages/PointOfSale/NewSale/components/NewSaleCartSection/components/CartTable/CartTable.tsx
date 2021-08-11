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
import React, { ReactElement } from 'react';
import { saleService } from 'services/services';
import { numberFormatINRCurrency, rawClone } from 'utilities/general';
import { ICONS } from 'utilities/utilities';
import { useTheme } from '../../../../../../../customHooks/useTheme';
import { ICartTableProps } from './CartTable.types';
import { CartTableCollapsedContent } from './Components/CartTableCollapsedContent';

const CartTable = (props: ICartTableProps): ReactElement => {
    // props
    const { cartData } = props;

    console.log(rawClone(cartData.get()));

    // hooks
    const { colors } = useTheme();

    // hanlders
    const searchFieldFocusHandler = () => {
        // handler search field focus
    };

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
        const { quantity, taxBracket, unitPrice, productDiscount } = rowData;

        return numberFormatINRCurrency(
            saleService.computeProductSubTotal({
                discount: productDiscount,
                quantity,
                taxBracket,
                unitPrice,
            }),
        );
    };

    const pricePerUnitRenderer: TTableCellCustomRenderer<ICartDetails> = (props) => {
        const { rowData } = props;
        const { unitPrice } = rowData;
        return numberFormatINRCurrency(unitPrice);
    };

    const Action: TTableCellCustomRenderer<ICartDetails> = (props) => {
        const {} = props;
        return (
            <IconButton
                icon={<Icon icon={ICONS.outlineDeleteOutline} />}
                theme="danger"
                size="small"
            />
        );
    };

    const emptyTableCTA = () => {
        // handlers
        const onClickHandler = () => searchFieldFocusHandler();

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
};

export default CartTable;
