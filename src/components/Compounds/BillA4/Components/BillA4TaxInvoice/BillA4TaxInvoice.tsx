import React, { ReactElement } from 'react';
import styles from './BillA4TaxInvoice.module.scss';
import mainStyles from '../../BillA4.module.scss';
import { IBillA4ChildProps } from '../../BillA4.types';

export const BillA4TaxInvoice = (props: IBillA4ChildProps): ReactElement => {
    // props
    const {
        settings: { taxInvoiceSection },
        data: { customer },
    } = props;

    // draw
    return (
        <>
            {taxInvoiceSection.show && (
                <>
                    <div className={mainStyles.billSubTitle}>TAX INVOICE</div>
                    <div className={mainStyles.dashedBorder} />
                    <div className={styles.cutomerDetailsWrapper}>
                        <div className={styles.customerVerticalSection}>
                            <div className={styles.customerDetailNode}>
                                <h6>Customer Name</h6>
                                <p>{customer.name || '-'}</p>
                            </div>
                            {taxInvoiceSection.GSTNumber && (
                                <div className={styles.customerDetailNode}>
                                    <h6>Customer GSTIN</h6>
                                    <p>{customer.GSTNumber || '-'}</p>
                                </div>
                            )}
                        </div>
                        {taxInvoiceSection.billingAddress && (
                            <div className={styles.customerVerticalSection}>
                                <div className={styles.customerDetailNode}>
                                    <h6>Billing Address</h6>
                                    <p>{customer.billingAddress || '-'}</p>
                                </div>
                            </div>
                        )}
                        {taxInvoiceSection.shippingAddress && (
                            <div className={styles.customerVerticalSection}>
                                <div className={styles.customerDetailNode}>
                                    <h6>Shipping Address</h6>
                                    <p>{customer.shippingAddress || '-'}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
};
