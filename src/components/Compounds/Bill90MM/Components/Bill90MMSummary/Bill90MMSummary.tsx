import React, { ReactElement } from 'react';
import { IBill90MMChildProps } from '../../Bill90MM.types';
import styles from './Bill90MMSummary.module.scss';
import mainStyles from '../../Bill90MM.module.scss';
import { numberFormatINRCurrency } from '@sellerspot/universal-components';

export const Bill90MMSummary = (props: IBill90MMChildProps): ReactElement => {
    const {
        data: { payment },
    } = props;
    const { grandTotal, subTotal, totalDiscount, totalTax } = payment;

    const grandTotalTaxPercentage = (totalTax / (grandTotal - totalTax)) * 100;

    return (
        <>
            <div className={mainStyles.PageBreak} />
            <div className={styles.saleSummary}>
                <div className={styles.summaryRow}>
                    <p className={styles.summaryRowTitle}>SUB-TOTAL</p>
                    <p className={styles.summaryRowValue}>{numberFormatINRCurrency(subTotal)}</p>
                </div>
            </div>
            <div className={styles.saleSummary}>
                <div className={styles.summaryRow}>
                    <p className={styles.summaryRowTitle}>DISCOUNT (sale)</p>
                    <p className={styles.summaryRowValue}>
                        {numberFormatINRCurrency(totalDiscount)}
                    </p>
                </div>
            </div>
            <div className={styles.saleSummary}>
                <div className={styles.summaryRow}>
                    <p className={styles.summaryRowTitle}>{`TAX (${grandTotalTaxPercentage})`}</p>
                    <p className={styles.summaryRowValue}>{numberFormatINRCurrency(totalTax)}</p>
                </div>
            </div>
            <div className={styles.saleSummary}>
                <div className={styles.summaryRow}>
                    <p className={styles.summaryRowTitle}>GRAND TOTAL</p>
                    <p className={styles.summaryRowValue}>{numberFormatINRCurrency(grandTotal)}</p>
                </div>
            </div>
        </>
    );
};
