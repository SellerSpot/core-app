import React, { ReactElement } from 'react';
import { IBill90MMChildProps } from '../../Bill90MM.types';
import styles from './Bill90MMSummary.module.scss';
import mainStyles from '../../Bill90MM.module.scss';

export const Bill90MMSummary = (props: IBill90MMChildProps): ReactElement => {
    const {
        data: { totals },
    } = props;
    const { grandTotal, grandTotalDiscount, grandTotalTax, grandTotalTaxPercentage } = totals;
    return (
        <>
            <div className={mainStyles.PageBreak} />
            <div className={styles.saleSummary}>
                <div className={styles.summaryRow}>
                    <p className={styles.summaryRowTitle}>DISCOUNT (sale)</p>
                    <p className={styles.summaryRowValue}>{grandTotalDiscount}</p>
                </div>
            </div>
            <div className={styles.saleSummary}>
                <div className={styles.summaryRow}>
                    <p className={styles.summaryRowTitle}>SUBTOTAL</p>
                    <p className={styles.summaryRowValue}>
                        {grandTotal - grandTotalDiscount - grandTotalDiscount}
                    </p>
                </div>
            </div>
            <div className={styles.saleSummary}>
                <div className={styles.summaryRow}>
                    <p className={styles.summaryRowTitle}>{`TAX (${grandTotalTaxPercentage})`}</p>
                    <p className={styles.summaryRowValue}>{grandTotalTax}</p>
                </div>
            </div>
            <div className={styles.saleSummary}>
                <div className={styles.summaryRow}>
                    <p className={styles.summaryRowTitle}>TOTAL</p>
                    <p className={styles.summaryRowValue}>{grandTotal}</p>
                </div>
            </div>
        </>
    );
};
