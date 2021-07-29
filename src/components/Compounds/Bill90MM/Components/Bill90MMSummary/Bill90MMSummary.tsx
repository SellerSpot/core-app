import React, { ReactElement } from 'react';
import { IBill90MMChildProps } from '../../Bill90MM.types';
import styles from './Bill90MMSummary.module.scss';
import mainStyles from '../../Bill90MM.module.scss';

export const Bill90MMSummary = (props: IBill90MMChildProps): ReactElement => {
    return (
        <>
            <div className={mainStyles.PageBreak} />
            <div className={styles.saleSummary}>
                <div className={styles.summaryRow}>
                    <p className={styles.summaryRowTitle}>DISCOUNT (sale)</p>
                    <p className={styles.summaryRowValue}>{saleDiscount}</p>
                </div>
            </div>
            <div className={styles.saleSummary}>
                <div className={styles.summaryRow}>
                    <p className={styles.summaryRowTitle}>SUBTOTAL</p>
                    <p className={styles.summaryRowValue}>{saleSubTotal}</p>
                </div>
            </div>
            <div className={styles.saleSummary}>
                <div className={styles.summaryRow}>
                    <p className={styles.summaryRowTitle}>{`TAX (${saleTotalTaxPercentage})`}</p>
                    <p className={styles.summaryRowValue}>{saleTotalTax}</p>
                </div>
            </div>
            <div className={styles.saleSummary}>
                <div className={styles.summaryRow}>
                    <p className={styles.summaryRowTitle}>TOTAL</p>
                    <p className={styles.summaryRowValue}>{saleTotal}</p>
                </div>
            </div>
        </>
    );
};
