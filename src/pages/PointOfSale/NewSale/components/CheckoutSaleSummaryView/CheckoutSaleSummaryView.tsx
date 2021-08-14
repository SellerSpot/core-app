import { Button, Card, InputField } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import cn from 'classnames';
import { numberFormatINRCurrency } from 'utilities/general';
import styles from './CheckoutSaleSummaryView.module.scss';
import { ICheckoutSaleSummaryViewProps } from './CheckoutSaleSummaryView.types';
import { newSaleState } from '../../NewSale';
import { useState } from '@hookstate/core';
export { ICheckoutSaleSummaryViewProps } from './CheckoutSaleSummaryView.types';

export const CheckoutSaleSummaryView = (props: ICheckoutSaleSummaryViewProps): ReactElement => {
    // props
    const { proceedCallback, viewMode } = props;

    // state
    const payment = useState(newSaleState.saleData.payment);
    const { amountPaid, grandTotal, subTotal, totalDiscount, totalTax } = payment.get();

    // renderer helpers
    const Content = (): ReactElement => {
        const paidAmount = useState(0);

        const handlePaidOnChange = (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            paidAmount.set(+event.target.value);
        };

        const paidValue = paidAmount.get() + '';
        const balance = amountPaid - grandTotal > 0 ? amountPaid - grandTotal : 0;

        return (
            <div className={styles.cardContent}>
                <div className={styles.contentRow}>
                    <h6>Sub-total</h6>
                    <h6>{numberFormatINRCurrency(subTotal)}</h6>
                </div>
                <div className={styles.contentRow}>
                    <h6>Total taxes</h6>
                    <h6>{numberFormatINRCurrency(totalTax)}</h6>
                </div>
                <div className={styles.contentRow}>
                    <h6>Total discount</h6>
                    <h6>{numberFormatINRCurrency(totalDiscount)}</h6>
                </div>
                <div className={styles.contentRow}>
                    <h3>Grand total</h3>
                    <h3>{numberFormatINRCurrency(grandTotal)}</h3>
                </div>
                {viewMode === 'checkout' && (
                    <>
                        <div className={styles.contentRow}>
                            <h4>Paid</h4>
                            <div className={styles.paidField}>
                                <InputField
                                    prefix="₹"
                                    type="number"
                                    direction="rtl"
                                    disableHelperTextPlaceholderPadding
                                    onChange={handlePaidOnChange}
                                    value={paidValue}
                                />
                            </div>
                        </div>
                        <div className={styles.contentRow}>
                            <h5 className={styles.balanceText}>Balance</h5>
                            <h5 className={styles.balanceText}>
                                {numberFormatINRCurrency(balance)}
                            </h5>
                        </div>
                    </>
                )}
            </div>
        );
    };

    const Action = () => {
        return (
            <Button
                fullWidth
                label={
                    <>
                        {viewMode === 'cart' && (
                            <div className={cn(styles.actionButton, styles.checkoutButton)}>
                                <h2>PAY</h2>
                                <h2>{numberFormatINRCurrency(grandTotal)}</h2>
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
            />
        );
    };

    return (
        <Card
            className={{
                cardWrapper: styles.cardWrapper,
                contentWrapper: styles.cardContentWrapper,
            }}
            content={<Content />}
            actions={<Action />}
            inBuiltPadding={false}
        />
    );
};
