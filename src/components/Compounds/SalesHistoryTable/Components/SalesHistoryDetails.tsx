import React, { ReactElement } from 'react';
import { Button, ITableProps, ITableRow, Table } from '@sellerspot/universal-components';
import { ISalesHistoryTableProps } from '../SalesHistoryTable.types';
import { SalesHistoryService } from '../SalesHistoryTable.service';
import styles from '../SalesHistoryTable.module.scss';
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

const getTableBody = (
    toggleRowExpansion: (rowIndex: number) => void,
    products: ISalesHistoryTableProps['saleHistory'][0]['products'],
): ITableRow[] => {
    return products.map((product, productIndex) => {
        const rowOnClickHandler = () => {
            toggleRowExpansion(productIndex);
        };
        return {
            cells: SalesHistoryService.getProductTableCells(product, productIndex),
            onClick: rowOnClickHandler,
        };
    });
};

const ProductsTable = (props: {
    products: ISalesHistoryTableProps['saleHistory'][0]['products'];
}) => {
    const { products } = props;
    const tableBody: ITableProps['body'] = ({ toggleRowExpansion }) => {
        return getTableBody(toggleRowExpansion, products);
    };
    return (
        <Table
            variant="simple"
            size="small"
            maxHeight={200}
            stickyHeader={true}
            headers={SalesHistoryService.productsTableHeaders}
            body={tableBody}
        />
    );
};

export const SalesHistoryDetails = (props: {
    sale: ISalesHistoryTableProps['saleHistory'][0];
}): ReactElement => {
    const { sale } = props;
    const { products } = sale;

    return (
        <div className={styles.collapsedContent}>
            <div className={styles.productsView}>
                <div>
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
