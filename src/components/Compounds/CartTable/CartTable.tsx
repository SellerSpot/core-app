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
import { ICartTableProduct } from './CartTable.types';
import { CartTableCollapsedContent } from './Components/CartTableCollapsedContent';

export default function CartTable(): ReactElement {
    // state
    const { productsData } = useSelector(cartSelector);

    // compute
    const SNoField: TTableCellCustomRenderer<ICartTableProduct> = (props) => {
        const { rowIndex } = props;
        return rowIndex + 1;
    };
    const CustomRenderComponent: ITableCollapsedCustomRenderer<ICartTableProduct> = (props) => {
        const { rowData, rowIndex, toggleRowExpansion } = props;
        return (
            <CartTableCollapsedContent
                product={rowData}
                productIndex={rowIndex}
                toggleRowExpansion={toggleRowExpansion}
            />
        );
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
            {
                columnName: 'S.No',
                width: '5%',
                align: 'left',
                customRenderer: SNoField,
            },
            {
                dataKey: 'productName',
                columnName: 'Product',
                width: '55%',
                align: 'left',
            },
            {
                dataKey: 'quantity',
                columnName: 'Qty',
                width: '5%',
                align: 'right',
            },
            {
                columnName: 'Sub-Total',
                width: '25%',
                align: 'right',
                customRenderer: (props) => {
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
                },
            },
            {
                columnName: '',
                width: '5%',
                align: 'right',
                customRenderer: Action,
            },
        ],
        collapsedContentRenderer: CustomRenderComponent,
    };

    return <Table {...tableProps} />;
}
