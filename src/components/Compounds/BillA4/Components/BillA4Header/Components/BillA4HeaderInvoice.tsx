import { IBillA4ChildProps } from 'components/Compounds/BillA4/BillA4.types';
import React, { ReactElement } from 'react';
import styles from '../BillA4Header.module.scss';

export const BillA4HeaderInvoice = (props: IBillA4ChildProps): ReactElement => {
    const { settings } = props;
    const { GSTNumber } = settings;
    return (
        <div className={styles.billInvoiceDetailsWrapper}>
            {GSTNumber.show && (
                <div className={styles.billInvoiceDetails}>
                    <div className={styles.billInvoiceDetailsTitleHolder}>GST No:</div>
                    <div className={styles.billInvoiceDetailsValueHolder}>{GSTNumber.data}</div>
                </div>
            )}
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
