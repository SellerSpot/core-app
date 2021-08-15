import React, { ReactElement } from 'react';
import { ICartDetails, ISaleData } from '@sellerspot/universal-types';
import styles from './ParkedSaleExpandedView.module.scss';
import {
    Button,
    ITableProps,
    Table,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import { numberFormatINRCurrency } from 'utilities/general';

interface IParkedSaleExpandedViewProps {
    rowData: ISaleData;
    onRetrieveSaleClickHandler: () => void;
    onDeleteSaleClickHandler: () => void;
}

export const ParkedSaleExpandedView = (props: IParkedSaleExpandedViewProps): ReactElement => {
    // props
    const {
        rowData: {
            cart,
            payment: { totalDiscount, totalTax, grandTotal, subTotal },
            customer: { name: customerName },
        },
        onRetrieveSaleClickHandler,
        onDeleteSaleClickHandler,
    } = props;

    // handlers

    // table render helpers
    const serialNumberRenderer: TTableCellCustomRenderer<ICartDetails> = (props) => {
        const { rowIndex } = props;
        return rowIndex + 1;
    };
    const productNameRenderer: TTableCellCustomRenderer<ICartDetails> = (props) => {
        const { rowData } = props;
        return rowData.product.name;
    };
    const taxAmountRenderer: TTableCellCustomRenderer<ICartDetails> = (props) => {
        const { rowData } = props;
        return numberFormatINRCurrency(rowData.totalTax); // handle tax rate
    };
    const unitPriceRenderer: TTableCellCustomRenderer<ICartDetails> = (props) => {
        const { rowData } = props;
        return numberFormatINRCurrency(rowData.sellingPrice);
    };
    const discountRenderer: TTableCellCustomRenderer<ICartDetails> = (props) => {
        const { rowData } = props;
        return numberFormatINRCurrency(rowData.totalDiscount); // handle discount type
    };
    const subTotalRenderer: TTableCellCustomRenderer<ICartDetails> = (props) => {
        const { rowData } = props;
        return numberFormatINRCurrency(rowData.grandTotal); // add tax and reduce discount
    };

    const tableProps: ITableProps<ICartDetails> = {
        data: cart ?? [],
        shape: [
            {
                columnName: 'S.No',
                align: 'right',
                width: '5%',
                customRenderer: serialNumberRenderer,
            },
            {
                columnName: 'Product name',
                align: 'left',
                width: '20%',
                customRenderer: productNameRenderer,
            },
            {
                columnName: 'Unit price',
                align: 'right',
                width: '15%',
                customRenderer: unitPriceRenderer,
            },
            {
                columnName: 'Quantity',
                align: 'right',
                width: '15%',
                dataKey: 'quantity',
            },
            {
                columnName: 'Tax amount',
                align: 'right',
                width: '15%',
                customRenderer: taxAmountRenderer,
            },
            {
                columnName: 'Discount',
                align: 'right',
                width: '15%',
                customRenderer: discountRenderer,
            },
            {
                columnName: 'Sub-total',
                align: 'right',
                width: '15%',
                customRenderer: subTotalRenderer,
            },
        ],
        emptyStateMessage: 'No data found!',
        stickyHeader: true,
        size: 'small',
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.saleDetailsHolder}>
                <h5>Sale details</h5>
                <div className={styles.tableSection}>
                    <div className={styles.tableHolder}>
                        <Table {...tableProps} />
                    </div>
                    <div className={styles.summaryWrapper}>
                        <div className={styles.secitonWrapper}>
                            <h6>Customer details</h6>
                            <div className={styles.customerDetailsHolder}>
                                {
                                    customerName
                                    // give view more link and fetch customer details on demand on view more click and append in the same dom
                                }
                            </div>
                        </div>
                        <div className={styles.salesTotalHolder}>
                            <div className={styles.saleSummaryGroup}>
                                <div>Sub-total</div>
                                <div>{numberFormatINRCurrency(subTotal)}</div>
                            </div>
                            <div className={styles.saleSummaryGroup}>
                                <div>Total tax</div>
                                <div>{numberFormatINRCurrency(totalTax)}</div>
                            </div>
                            <div className={styles.saleSummaryGroup}>
                                <div>Total discount</div>
                                <div>{numberFormatINRCurrency(totalDiscount)}</div>
                            </div>
                            <div className={styles.summaryGroupHorizontalRule} />
                            <div className={styles.saleSummaryGroup}>
                                <h6>Grand total</h6>
                                <h6>{numberFormatINRCurrency(grandTotal)}</h6>
                            </div>
                            <div className={styles.summaryGroupHorizontalRule} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.actionsHolder}>
                <h5 className={styles.actionsTextHolder}>Actions</h5>
                <div className={styles.actions}>
                    <Button
                        variant="contained"
                        theme="primary"
                        label="Retrieve Sale"
                        fullWidth={true}
                        onClick={onRetrieveSaleClickHandler}
                    />
                    <Button
                        variant="outlined"
                        theme="danger"
                        label="Delete Sale"
                        fullWidth={true}
                        onClick={onDeleteSaleClickHandler}
                    />
                </div>
            </div>
        </div>
    );
};
