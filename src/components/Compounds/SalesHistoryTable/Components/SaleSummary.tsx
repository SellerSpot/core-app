import React, { ReactElement } from 'react';
import { ISalesHistoryTableProps } from '../SalesHistoryTable';
import styles from '../SalesHistoryTable.module.scss';

const Divider = () => {
    return <hr className={styles.divider} />;
};

export const SaleSummary = (props: {
    sale: ISalesHistoryTableProps['saleHistory'][0];
}): ReactElement => {
    const { sale } = props;
    const { balance, saleTotal, subTotal, totalTax } = sale;
    return (
        <div className={styles.salesSummary}>
            <div className={styles.summaryRow}>
                <h6>Sub-Total</h6>
                <h6>{subTotal}</h6>
            </div>
            <Divider />
            <div className={styles.summaryRow}>
                <h6>Total Tax</h6>
                <h6>{totalTax}</h6>
            </div>
            <Divider />
            <div className={styles.summaryRow}>
                <h5>Sale Total</h5>
                <h5>{saleTotal}</h5>
            </div>
            <Divider />
            <div className={styles.summaryRow}>
                <h6>Balance</h6>
                <h6>{balance}</h6>
            </div>
        </div>
    );
};
