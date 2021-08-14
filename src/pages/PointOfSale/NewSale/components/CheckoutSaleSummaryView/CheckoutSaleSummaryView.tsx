import { Button, Card, IInputFieldProps, InputField } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import cn from 'classnames';
import { numberFormatINRCurrency } from 'utilities/general';
import styles from './CheckoutSaleSummaryView.module.scss';
import { ICheckoutSaleSummaryViewProps } from './CheckoutSaleSummaryView.types';
import { newSaleState } from '../../NewSale';
import { useState } from '@hookstate/core';
import { EPaymentMethods } from '@sellerspot/universal-types';
import { useRef } from 'react';
export { ICheckoutSaleSummaryViewProps } from './CheckoutSaleSummaryView.types';

export const CheckoutSaleSummaryView = (props: ICheckoutSaleSummaryViewProps): ReactElement => {
    // props
    const { proceedCallback, viewMode } = props;

    // hooks
    const amountPaidRef = useRef<HTMLInputElement>(null);

    // state
    const payment = useState(newSaleState.saleData.payment);

    // handlers
    const paidOnChangeHandler: IInputFieldProps['onChange'] = (event) => {
        const amountPaid = +event.target.value;
        const grandTotal = payment.grandTotal.get();
        payment.batch((state) => {
            state.amountPaid.set(amountPaid);
            state.balanceGiven.set(amountPaid - grandTotal > 0 ? amountPaid - grandTotal : 0);
        });
    };

    // renderer helpers
    const Content = (): ReactElement => {
        return (
            <div className={styles.cardContent}>
                <div className={styles.contentRow}>
                    <h6>Sub-total</h6>
                    <h6>{numberFormatINRCurrency(payment.subTotal.get())}</h6>
                </div>
                <div className={styles.contentRow}>
                    <h6>Total taxes</h6>
                    <h6>{numberFormatINRCurrency(payment.totalTax.get())}</h6>
                </div>
                <div className={styles.contentRow}>
                    <h6>Total discount</h6>
                    <h6>{numberFormatINRCurrency(payment.totalDiscount.get())}</h6>
                </div>
                <div className={styles.contentRow}>
                    <h3>Grand total</h3>
                    <h3>{numberFormatINRCurrency(payment.grandTotal.get())}</h3>
                </div>
                {viewMode === 'checkout' && payment.method.get() === EPaymentMethods.CASH && (
                    <>
                        <div className={styles.contentRow}>
                            <h4>Paid</h4>
                            <div className={styles.paidField}>
                                <InputField
                                    ref={amountPaidRef}
                                    prefix="₹"
                                    type="number"
                                    direction="rtl"
                                    theme="primary"
                                    minNumericValue={0}
                                    disableHelperTextPlaceholderPadding
                                    onChange={paidOnChangeHandler}
                                    value={payment.amountPaid.get() + ''}
                                />
                            </div>
                        </div>
                        <div className={styles.contentRow}>
                            <h5 className={styles.balanceText}>Balance</h5>
                            <h5 className={styles.balanceText}>
                                {numberFormatINRCurrency(payment.balanceGiven.get())}
                            </h5>
                        </div>
                    </>
                )}
            </div>
        );
    };

    const Action = () => {
        // handlers
        const checkIsDisabled = () => {
            if (viewMode === 'checkout') {
                const { method, amountPaid, grandTotal } = payment.get();
                // check if customer details entered in case of non anonymous entry
                if (method === EPaymentMethods.CASH) {
                    if (amountPaid < grandTotal) {
                        return true;
                    }
                }
            } else if (viewMode === 'cart') {
                if (newSaleState.saleData.cart.length <= 0) {
                    return true;
                }
            } else if (viewMode === 'park') {
                // ask customer details
            } else if (viewMode === 'quote') {
                // if customer details - on , and customer details not entered disable button
            }
            return false;
        };

        return (
            <Button
                fullWidth
                label={
                    <>
                        {viewMode === 'cart' && (
                            <div className={cn(styles.actionButton, styles.checkoutButton)}>
                                <h2>PAY</h2>
                                <h2>{numberFormatINRCurrency(payment.grandTotal.get())}</h2>
                            </div>
                        )}
                        {viewMode === 'checkout' && (
                            <div className={cn(styles.actionButton, styles.cartButton)}>
                                <h2>COMPLETE SALE</h2>
                            </div>
                        )}
                        {viewMode === 'park' && (
                            <div className={cn(styles.actionButton, styles.cartButton)}>
                                <h2>PARK SALE</h2>
                            </div>
                        )}
                        {viewMode === 'quote' && (
                            <div className={cn(styles.actionButton, styles.cartButton)}>
                                <h2>QUOTE SALE</h2>
                            </div>
                        )}
                    </>
                }
                variant="contained"
                theme="primary"
                onClick={proceedCallback}
                disabled={checkIsDisabled()}
            />
        );
    };

    return (
        <Card
            className={{
                cardWrapper: styles.cardWrapper,
                contentWrapper: styles.cardContentWrapper,
            }}
            content={Content()} // called without constructor method - reason - will cause re initialize on evey change
            actions={Action()}
            inBuiltPadding={false}
        />
    );
};
