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
    const saleStatus = useState(newSaleState.saleData.status);

    // globals
    const paymentMethods: EPaymentMethods[] = [EPaymentMethods.CASH, EPaymentMethods.CARD];

    // handlers
    const onPaymentModeClickHanlder = (method: EPaymentMethods) => () => {
        payment.method.set(method);
    };

    // only for uncompleted sale display payment option,
    // and uncompleted sale can be predicted throguht the sateStatus is when null
    if (saleStatus.get() !== null) return null;

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
