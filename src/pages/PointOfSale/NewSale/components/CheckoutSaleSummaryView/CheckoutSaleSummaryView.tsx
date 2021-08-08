import { Button, Card, InputField } from '@sellerspot/universal-components';
import React, { ReactElement, useState } from 'react';
import cn from 'classnames';
import { numberFormatINRCurrency } from 'utilities/general';
import styles from './CheckoutSaleSummaryView.module.scss';
import { ICheckoutSaleSummaryViewProps } from './CheckoutSaleSummaryView.types';
export { ICheckoutSaleSummaryViewProps } from './CheckoutSaleSummaryView.types';

export const CheckoutSaleSummaryView = (props: ICheckoutSaleSummaryViewProps): ReactElement => {
    const { proceedCallback, grandTotal, subTotal, totalDiscount, totalTaxes, viewMode } = props;

    const Content = (): ReactElement => {
        const [paidAmount, setPaidAmount] = useState(0);

        const handlePaidOnChange = (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            setPaidAmount(+event.target.value);
        };

        const paidValue = paidAmount + '';
        const balance = paidAmount - grandTotal > 0 ? paidAmount - grandTotal : 0;

        return (
            <div className={styles.cardContent}>
                <div className={styles.contentRow}>
                    <h6>Sub-total</h6>
                    <h6>{numberFormatINRCurrency(subTotal)}</h6>
                </div>
                <div className={styles.contentRow}>
                    <h6>Total taxes</h6>
                    <h6>{numberFormatINRCurrency(totalTaxes)}</h6>
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
                    <div
                        className={cn(styles.actionButton, {
                            [styles.checkoutButton]: viewMode === 'cart',
                            [styles.cartButton]: viewMode === 'checkout',
                        })}
                    >
                        {viewMode === 'cart' ? (
                            <>
                                <h2>PAY</h2>
                                <h2>{numberFormatINRCurrency(grandTotal)}</h2>
                            </>
                        ) : (
                            <h2>COMPLETE SALE</h2>
                        )}
                    </div>
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
