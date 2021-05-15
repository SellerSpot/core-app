import React, { ReactElement } from 'react';
import styles from '../BillA4Header.module.scss';

export const BillA4HeaderInvoice = (): ReactElement => {
    return (
        <div className={styles.billInvoiceDetailsWrapper}>
            <div className={styles.billInvoiceDetails}>
                <div className={styles.billInvoiceDetailsTitleHolder}>GST No:</div>
                <div className={styles.billInvoiceDetailsValueHolder}>22AAAAA0000A1Z5</div>
            </div>
            <div className={styles.billInvoiceDetails}>
                <div className={styles.billInvoiceDetailsTitleHolder}>Invoice Date:</div>
                <div className={styles.billInvoiceDetailsValueHolder}>10/11/2020</div>
            </div>
            <div className={styles.billInvoiceDetails}>
                <div className={styles.billInvoiceDetailsTitleHolder}>Invoice Number:</div>
                <div className={styles.billInvoiceDetailsValueHolder}>IND123</div>
            </div>
        </div>
    );
};
