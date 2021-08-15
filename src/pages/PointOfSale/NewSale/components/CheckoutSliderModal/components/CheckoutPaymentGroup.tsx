import React from 'react';
import { ReactElement } from 'react';
import { EPaymentMethods } from '@sellerspot/universal-types';
import { Button } from '@sellerspot/universal-components';
import { useState } from '@hookstate/core';
import { newSaleState } from 'pages/PointOfSale/NewSale/NewSale';
import styles from '../CheckoutSliderModal.module.scss';

export const CheckoutPaymentGroup = (): ReactElement => {
    // state
    const payment = useState(newSaleState.saleData.payment);

    // globals
    const paymentMethods: EPaymentMethods[] = [EPaymentMethods.CASH, EPaymentMethods.CARD];

    // handlers
    const onPaymentModeClickHanlder = (method: EPaymentMethods) => () => {
        payment.method.set(method);
    };

    return (
        <div className={styles.settingsGroup}>
            <h4>Payment mode</h4>
            <div className={styles.paymentModesWrapper}>
                {paymentMethods.map((paymentMethod) => (
                    <Button
                        key={paymentMethod}
                        label={paymentMethod}
                        variant="contained"
                        theme={payment.method.get() === paymentMethod ? 'primary' : 'auto'}
                        disableElevation
                        onClick={onPaymentModeClickHanlder(paymentMethod)}
                    />
                ))}
            </div>
        </div>
    );
};
