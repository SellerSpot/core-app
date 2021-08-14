import React, { ReactElement } from 'react';
import styles from './BillA4Summary.module.scss';
import mainStyles from '../../BillA4.module.scss';
import cn from 'classnames';
import { IBillA4ChildProps } from '../../BillA4.types';
import { numberFormatINRCurrency } from '@sellerspot/universal-components';

export const BillA4Summary = (props: IBillA4ChildProps): ReactElement => {
    const {
        settings: { purchaseSummarySection, remarkMessage },
        data: { payment, billSettings: dataBillSettings },
    } = props;

    const { totalDiscount: isTotalDiscountEnabled, youSaved: isYouSavedEnabled } =
        purchaseSummarySection;

    const { grandTotal, totalTax, totalDiscount, amountPaid, balanceGiven } = payment;

    return (
        <div className={mainStyles.advertisementAndGrandTotalWrapper}>
            <div className={styles.advertisementHolder}>
                {remarkMessage.show && (dataBillSettings.remarkMessage ?? remarkMessage.data)}
            </div>
            <div className={mainStyles.grandTotalWrapper}>
                {isTotalDiscountEnabled && (
                    <div className={mainStyles.grandTotalHolder}>
                        <div className={mainStyles.grandTotalTitle}>
                            <h6>Total Discount</h6>
                        </div>
                        <div className={mainStyles.grandTotalValue}>
                            <h6>{numberFormatINRCurrency(totalDiscount)}</h6>
                        </div>
                    </div>
                )}
                <div className={mainStyles.grandTotalHolder}>
                    <div className={mainStyles.grandTotalTitle}>
                        <h6>Total Tax</h6>
                    </div>
                    <div className={mainStyles.grandTotalValue}>
                        <h6>{numberFormatINRCurrency(totalTax)}</h6>
                    </div>
                </div>
                <div className={cn(mainStyles.grandTotalHolder, styles.grandTotalLarge)}>
                    <div className={mainStyles.grandTotalTitle}>
                        <h6>Invoice Total</h6>
                    </div>
                    <div className={mainStyles.grandTotalValue}>
                        <h6>{numberFormatINRCurrency(grandTotal)}</h6>
                    </div>
                </div>
                <div className={mainStyles.grandTotalHolder}>
                    <div className={mainStyles.grandTotalTitle}>
                        <h6>Paid</h6>
                    </div>
                    <div className={mainStyles.grandTotalValue}>
                        <h6>{numberFormatINRCurrency(amountPaid)}</h6>
                    </div>
                </div>
                <div className={mainStyles.grandTotalHolder}>
                    <div className={mainStyles.grandTotalTitle}>
                        <h6>Balance</h6>
                    </div>
                    <div className={mainStyles.grandTotalValue}>
                        <h6>{numberFormatINRCurrency(balanceGiven)}</h6>
                    </div>
                </div>
                {isYouSavedEnabled && (
                    <div className={mainStyles.grandTotalHolder}>
                        <div className={mainStyles.grandTotalTitle}>
                            <h6>You Saved</h6>
                        </div>
                        <div className={mainStyles.grandTotalValue}>
                            <h6>{numberFormatINRCurrency(totalDiscount)}</h6>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
