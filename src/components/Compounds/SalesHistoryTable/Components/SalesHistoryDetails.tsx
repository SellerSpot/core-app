import { Button, ITableProps, Table } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import styles from '../SalesHistoryTable.module.scss';
import { ISalesHistoryTableProps } from '../SalesHistoryTable.types';
import { SaleSummary } from './SaleSummary';

const Controls = (): ReactElement => {
    return (
        <>
            <Button
                fullWidth
                key={'editSaleControl'}
                label={'Edit Sale'}
                variant={'contained'}
                theme={'primary'}
            />
            <Button
                fullWidth
                key={'printRecieptControl'}
                label={'Print Reciept'}
                variant={'outlined'}
                theme={'primary'}
            />
            <Button
                fullWidth
                key={'voidSaleControl'}
                label={'Void Sale'}
                variant={'outlined'}
                theme={'danger'}
            />
        </>
    );
};

const ProductsTable = (props: {
    products: ISalesHistoryTableProps['saleHistory'][0]['products'];
}) => {
    const { products } = props;

    const tableProps: ITableProps<ISalesHistoryTableProps['saleHistory'][0]['products'][0]> = {
        data: products,
        size: 'small',
        shape: [
            {
                columnName: 'S.No',
                width: '5%',
                align: 'center',
                customRenderer: (props) => {
                    const { rowIndex } = props;
                    return rowIndex + 1;
                },
            },
            {
                width: '30%',
                dataKey: 'productName',
                columnName: 'Product',
            },
            {
                dataKey: 'quantity',
                columnName: 'Quantity',
                align: 'right',
            },
            {
                dataKey: 'unitPrice',
                columnName: 'Unit Price',
                align: 'right',
            },
            {
                dataKey: 'taxAmount',
                columnName: 'Tax',
                align: 'right',
            },
            {
                dataKey: 'subTotal',
                columnName: 'Sub-Total',
                align: 'right',
            },
        ],
    };

    // draw
    return <Table {...tableProps} />;
};

export const SalesHistoryDetails = (props: {
    sale: ISalesHistoryTableProps['saleHistory'][0];
}): ReactElement => {
    // props
    const { sale } = props;
    const { products } = sale;

    // draw
    return (
        <div className={styles.collapsedContent}>
            <div className={styles.productsView}>
                <div className={styles.productsViewHeading}>
                    <h4>Sale Details</h4>
                </div>
                <div className={styles.productsTable}>
                    <ProductsTable products={products} />
                </div>
                <div className={styles.saleSummaryWrapper}>
                    <SaleSummary sale={sale} />
                </div>
            </div>
            <div className={styles.controls}>
                <Controls />
            </div>
        </div>
    );
};
