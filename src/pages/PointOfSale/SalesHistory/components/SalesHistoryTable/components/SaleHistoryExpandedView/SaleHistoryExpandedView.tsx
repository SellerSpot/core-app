import React, { ReactElement } from 'react';
import { ICartDetails, ISaleData } from '@sellerspot/universal-types';
import styles from './SaleHistoryExpandedView.module.scss';
import {
    Button,
    ITableProps,
    Table,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';

export const SaleHistoryExpandedView = (props: { rowData: ISaleData }): ReactElement => {
    // props
    const {
        rowData: {
            cart,
            payment: {
                totalDiscount,
                totalTax,
                amountPaid,
                grandTotal,
                balanceGiven,
                subTotal,
                method: paymentMethod,
            },
            customer: { name: customerName },
        },
    } = props;

    // handlers
    const onEditSaleClickHandler = () => {
        // do onEditSaleClickHandler action
    };
    const onPrintReceiptClickHandler = () => {
        // do onPrintReceiptClickHandler action
    };
    const onVoidSaleClickHandler = () => {
        // do onVoidSaleClickHandler action
    };

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
        return rowData.totalTax;
    };
    const discountRenderer: TTableCellCustomRenderer<ICartDetails> = (props) => {
        const { rowData } = props;
        return rowData.totalDiscount;
    };
    const subTotalRenderer: TTableCellCustomRenderer<ICartDetails> = (props) => {
        const { rowData } = props;
        return rowData.grandTotal;
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
                dataKey: 'sellingPrice',
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
                        <div className={styles.secitonWrapper}>
                            <h6>Payment method</h6>
                            <div className={styles.paymentCard}>{paymentMethod}</div>
                        </div>
                        <div className={styles.salesTotalHolder}>
                            <div className={styles.saleSummaryGroup}>
                                <div>Sub-total</div>
                                <div>{subTotal}</div>
                            </div>
                            <div className={styles.saleSummaryGroup}>
                                <div>Total tax</div>
                                <div>{totalTax}</div>
                            </div>
                            <div className={styles.saleSummaryGroup}>
                                <div>Total discount</div>
                                <div>{totalDiscount}</div>
                            </div>
                            <div className={styles.summaryGroupHorizontalRule} />
                            <div className={styles.saleSummaryGroup}>
                                <h6>Grand total</h6>
                                <h6>{grandTotal}</h6>
                            </div>
                            <div className={styles.summaryGroupHorizontalRule} />
                            <div className={styles.saleSummaryGroup}>
                                <div>Amount paid</div>
                                <div>{amountPaid}</div>
                            </div>
                            <div className={styles.saleSummaryGroup}>
                                <div>Balance</div>
                                <div>{balanceGiven}</div>
                            </div>
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
                        label="Edit Sale"
                        fullWidth={true}
                        onClick={onEditSaleClickHandler}
                    />
                    <Button
                        variant="outlined"
                        theme="primary"
                        label="Print Receipt"
                        fullWidth={true}
                        onClick={onPrintReceiptClickHandler}
                    />
                    <Button
                        variant="outlined"
                        theme="danger"
                        label="Void Sale"
                        fullWidth={true}
                        onClick={onVoidSaleClickHandler}
                    />
                </div>
            </div>
        </div>
    );
};
