import { useState } from '@hookstate/core';
import { newSaleState } from 'pages/PointOfSale/NewSale/NewSale';
import React, { ReactElement } from 'react';
import { IInputFieldProps, InputField, Switch } from '@sellerspot/universal-components';
import styles from '../CheckoutSliderModal.module.scss';
import { ITenantCustomerData } from '@sellerspot/universal-types';
import { NewSaleService } from 'pages/PointOfSale/NewSale/NewSale.service';

export const CheckoutCustomerDetailsGroup = (): ReactElement => {
    // state
    const customer = useState(newSaleState.saleData.customer);

    // handlers
    const onCustomerSwitchHandler = () => {
        const isAnonymous = !customer.isAnonymous.get();
        customer.set({ ...NewSaleService.getCustomerInitialState(), isAnonymous });
    };

    const onCustomerDetailsChange =
        (type: keyof ITenantCustomerData): IInputFieldProps['onChange'] =>
        (e) => {
            switch (type) {
                case 'mobile':
                    customer.mobile.set(e.target.value);
                    break;
                case 'name':
                    customer.name.set(e.target.value);
                    break;
                case 'email':
                    customer.email.set(e.target.value);
                    break;
                case 'GSTNumber':
                    customer.GSTNumber.set(e.target.value);
                    break;
                case 'shippingAddress':
                    customer.shippingAddress.set(e.target.value);
                    break;
                case 'billingAddress':
                    customer.billingAddress.set(e.target.value);
                    break;

                default:
                    break;
            }
        };

    return (
        <div className={styles.settingsGroup}>
            <div className={styles.horizontalSplit}>
                <h4>Customer details</h4>
                <Switch checked={!customer.isAnonymous.get()} onChange={onCustomerSwitchHandler} />
            </div>
            {!customer.isAnonymous.get() && (
                <div className={styles.horizontalSectionSplit}>
                    <div className={styles.horizontalSection}>
                        <div className={styles.settingsGroup}>
                            <InputField
                                required
                                type="text" // input field should type mobile type as well
                                label="Mobile"
                                placeHolder="9670xxxx2"
                                theme="primary"
                                disableHelperTextPlaceholderPadding
                                fullWidth
                                maxLength={10}
                                autoFocus={true}
                                onChange={onCustomerDetailsChange('mobile')}
                                value={customer.mobile.get()}
                            />
                            <InputField
                                required
                                type="text"
                                label="Name"
                                placeHolder="John Doe"
                                theme="primary"
                                disableHelperTextPlaceholderPadding
                                fullWidth
                                onChange={onCustomerDetailsChange('name')}
                                value={customer.name.get()}
                            />
                            <InputField
                                type="email"
                                label="Email ID"
                                placeHolder="john@gmail.com"
                                theme="primary"
                                disableHelperTextPlaceholderPadding
                                fullWidth
                                onChange={onCustomerDetailsChange('email')}
                                value={customer.email.get()}
                            />
                            <InputField
                                type="text"
                                label="GST Number"
                                placeHolder="234234098234236"
                                theme="primary"
                                maxLength={10}
                                disableHelperTextPlaceholderPadding
                                fullWidth
                                onChange={onCustomerDetailsChange('GSTNumber')}
                                value={customer.GSTNumber.get()}
                            />
                        </div>
                    </div>
                    <div className={styles.horizontalSection}>
                        <div className={styles.settingsGroup}>
                            <InputField
                                type="text"
                                label="Billing Address"
                                placeHolder={'69, K.K Nagar,\nwest street,\nTrichy - 620017'}
                                multiline
                                rows={3}
                                theme="primary"
                                disableHelperTextPlaceholderPadding
                                fullWidth
                                onChange={onCustomerDetailsChange('billingAddress')}
                                value={customer.billingAddress.get()}
                            />
                            <InputField
                                type="text"
                                label="Shipping Address"
                                placeHolder={'69, K.K Nagar,\nwest street,\nTrichy - 620017'}
                                multiline
                                rows={3}
                                theme="primary"
                                disableHelperTextPlaceholderPadding
                                fullWidth
                                onChange={onCustomerDetailsChange('shippingAddress')}
                                value={customer.shippingAddress.get()}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
