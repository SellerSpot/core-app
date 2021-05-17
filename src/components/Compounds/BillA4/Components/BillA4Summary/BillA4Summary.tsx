import React, { ReactElement } from 'react';
import styles from './BillA4Summary.module.scss';
import mainStyles from '../../BillA4.module.scss';
import cn from 'classnames';
import { COMMON_SYMBOLS } from 'utilities/general';

export const BillA4Summary = (): ReactElement => {
    return (
        <div className={mainStyles.advertisementAndGrandTotalWrapper}>
            <div className={styles.advertisementHolder}>Thanks for Shopping with us!</div>
            <div className={mainStyles.grandTotalWrapper}>
                <div className={mainStyles.grandTotalHolder}>
                    <div className={mainStyles.grandTotalTitle}>
                        <h6>Total Discount</h6>
                    </div>
                    <div className={mainStyles.grandTotalValue}>
                        {/* {`${COMMON_SYMBOLS.RUPEE_SYMBOL}${saleData.totals.grandTotalDiscount}`} */}
                        <h6>{`${COMMON_SYMBOLS.RUPEE_SYMBOL}${123}`}</h6>
                    </div>
                </div>
                <div className={mainStyles.grandTotalHolder}>
                    <div className={mainStyles.grandTotalTitle}>
                        <h6>Total Tax</h6>
                    </div>
                    <div className={mainStyles.grandTotalValue}>
                        {/* {`${COMMON_SYMBOLS.RUPEE_SYMBOL}${saleData.totals.grandTotalTax}`} */}
                        <h6>{`${COMMON_SYMBOLS.RUPEE_SYMBOL}${123}`}</h6>
                    </div>
                </div>
                <div className={cn(mainStyles.grandTotalHolder, styles.grandTotalLarge)}>
                    <div className={mainStyles.grandTotalTitle}>
                        <h6>Invoice Total</h6>
                    </div>
                    <div className={mainStyles.grandTotalValue}>
                        {/* {`${COMMON_SYMBOLS.RUPEE_SYMBOL}${saleData.totals.grandTotal}`} */}
                        <h6>{`${COMMON_SYMBOLS.RUPEE_SYMBOL}${1231}`}</h6>
                    </div>
                </div>
                <div className={mainStyles.grandTotalHolder}>
                    <div className={mainStyles.grandTotalTitle}>
                        <h6>Paid</h6>
                    </div>
                    <div className={mainStyles.grandTotalValue}>
                        {/* {`${COMMON_SYMBOLS.RUPEE_SYMBOL}${paymentInformation.paid}`} */}
                        <h6>{`${COMMON_SYMBOLS.RUPEE_SYMBOL}${123}`}</h6>
                    </div>
                </div>
                <div className={mainStyles.grandTotalHolder}>
                    <div className={mainStyles.grandTotalTitle}>
                        <h6>Balance</h6>
                    </div>
                    <div className={mainStyles.grandTotalValue}>
                        {/* {`${COMMON_SYMBOLS.RUPEE_SYMBOL}${paymentInformation.balance}`} */}
                        <h6>{`${COMMON_SYMBOLS.RUPEE_SYMBOL}${123}`}</h6>
                    </div>
                </div>
                <div className={mainStyles.grandTotalHolder}>
                    <div className={mainStyles.grandTotalTitle}>
                        <h6>You Saved</h6>
                    </div>
                    <div className={mainStyles.grandTotalValue}>
                        {/* {`${
                        COMMON_SYMBOLS.RUPEE_SYMBOL
                    } ${calculateTotalSavings(saleData)}`} */}
                        <h6>{`${COMMON_SYMBOLS.RUPEE_SYMBOL}${1233}`}</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};