import React, { ReactElement } from 'react';
import {
    Button,
    IInputFieldProps,
    InputField,
    ISelectOption,
    Select,
    SliderModal,
    SliderModalBody,
    SliderModalHeader,
    SliderModalLayoutWrapper,
    Switch,
} from '@sellerspot/universal-components';
import styles from './CheckoutSliderModal.module.scss';
import { BillHolder } from 'components/Compounds/BillHolder/BillHolder';
import { BillSettingsService } from 'pages/PointOfSale/BillSettings/BillSettings.service';
import { CheckoutSaleSummaryView } from '../CheckoutSaleSummaryView/CheckoutSaleSummaryView';
import { useState } from '@hookstate/core';
import { newSaleState } from '../../NewSale';
import { CheckoutSliderModalService } from './CheckoutSliderModal.service';
import { rawClone } from 'utilities/general';
import { EBILL_SIZES, EPaymentMethods } from '@sellerspot/universal-types';
import { billSizeComponentMap } from 'pages/PointOfSale/BillSettings/BillSettings';

export const CheckoutSliderModal = (): ReactElement => {
    // state
    const checkoutModal = useState(newSaleState.modals.checkout);
    const saleData = useState(newSaleState.saleData);
    const billSettings = useState(newSaleState.billSettings);
    const customer = useState(newSaleState.customer);

    // globals
    const paymentMethods: EPaymentMethods[] = [EPaymentMethods.CASH, EPaymentMethods.CARD];

    // handlers
    const modalGoBackHandler = () => {
        // go back logic
        checkoutModal.set(false);
    };

    const onCheckoutClickHandler = () => {
        // once checkout completed, go back to cart view, after clearing the cart state
        modalGoBackHandler();
    };

    const onBillTypeChangeHandler = (option: ISelectOption<EBILL_SIZES>) => {
        saleData.billSettings.size.set(option.key);
    };

    const onBillSettingsRemarkMessageChangeHandler: IInputFieldProps['onChange'] = (event) => {
        saleData.billSettings.remarkMessage.set(event.target.value);
    };

    const onPaymentModeClickHanlder = (method: EPaymentMethods) => () => {
        saleData.payment.method.set(method);
    };

    const onCustomerSwitchHandler = () => {
        customer.isAnonymous.set(!customer.isAnonymous.get());
    };

    // compute
    const { sliderTitle, summaryViewMode } = CheckoutSliderModalService.getComputedViewMode();

    const currentBillName = saleData.billSettings.size.get();
    const CurrentBillComponent = billSizeComponentMap[currentBillName].BILL;
    const currentBillDimension = billSizeComponentMap[currentBillName].dimension;
    const currentBillSettingsState = billSettings?.bills?.[currentBillName];

    // draw
    return (
        <SliderModal showModal={checkoutModal.get()} type="fixed" width="70%">
            <SliderModalLayoutWrapper>
                <SliderModalHeader
                    modalGoBackCallback={modalGoBackHandler}
                    modalGoBackText="Go back to cart"
                    title={sliderTitle}
                    titlePlacement="center"
                />
                <SliderModalBody>
                    <div className={styles.bodyWrapper}>
                        <div className={styles.billSectionWrapper}>
                            <BillHolder>
                                <CurrentBillComponent
                                    data={rawClone(saleData.get())}
                                    settings={rawClone(currentBillSettingsState.get())}
                                    dimension={currentBillDimension}
                                />
                            </BillHolder>
                        </div>
                        <div className={styles.actionsSectionWrapper}>
                            <div className={styles.actionSettingsWrapper}>
                                <div className={styles.settingsGroup}>
                                    <h4>Bill settings</h4>
                                    <Select
                                        label="Bill Size"
                                        options={BillSettingsService.billOptions}
                                        value={BillSettingsService.billOptions.find(
                                            (billOption) => billOption.key === currentBillName,
                                        )}
                                        onChange={onBillTypeChangeHandler}
                                        isClearable={false}
                                    />
                                    <InputField
                                        type="text"
                                        label="Remark message"
                                        placeHolder={'Remark message / thank you'}
                                        multiline
                                        rows={2}
                                        theme="primary"
                                        disableHelperTextPlaceholderPadding
                                        fullWidth
                                        value={saleData.billSettings.remarkMessage.get()}
                                        onChange={onBillSettingsRemarkMessageChangeHandler}
                                    />
                                </div>
                                <div className={styles.settingsGroup}>
                                    <div className={styles.horizontalSplit}>
                                        <h4>Customer details</h4>
                                        <Switch
                                            checked={!customer.isAnonymous.get()}
                                            onChange={onCustomerSwitchHandler}
                                        />
                                    </div>
                                    {!customer.isAnonymous.get() && (
                                        <div className={styles.horizontalSectionSplit}>
                                            <div className={styles.horizontalSection}>
                                                <div className={styles.settingsGroup}>
                                                    <InputField
                                                        type="number"
                                                        label="Mobile"
                                                        required
                                                        placeHolder="9670xxxx2"
                                                        theme="primary"
                                                        disableHelperTextPlaceholderPadding
                                                        fullWidth
                                                        autoFocus={true}
                                                    />
                                                    <InputField
                                                        type="text"
                                                        label="Name"
                                                        placeHolder="John Doe"
                                                        theme="primary"
                                                        disableHelperTextPlaceholderPadding
                                                        fullWidth
                                                    />
                                                    <InputField
                                                        type="email"
                                                        label="Email ID"
                                                        placeHolder="john@gmail.com"
                                                        theme="primary"
                                                        disableHelperTextPlaceholderPadding
                                                        fullWidth
                                                    />
                                                </div>
                                            </div>
                                            <div className={styles.horizontalSection}>
                                                <div className={styles.settingsGroup}>
                                                    <InputField
                                                        type="text"
                                                        label="Address"
                                                        placeHolder={
                                                            '69, K.K Nagar,\nwest street,\nTrichy - 620017'
                                                        }
                                                        multiline
                                                        rows={3}
                                                        theme="primary"
                                                        disableHelperTextPlaceholderPadding
                                                        fullWidth
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.checkoutWrapper}>
                                <div className={styles.settingsGroup}>
                                    <h4>Payment mode</h4>
                                    <div className={styles.paymentModesWrapper}>
                                        {paymentMethods.map((paymentMethod) => (
                                            <Button
                                                key={paymentMethod}
                                                label={paymentMethod}
                                                variant="contained"
                                                theme={
                                                    saleData.payment.method.get() === paymentMethod
                                                        ? 'primary'
                                                        : 'auto'
                                                }
                                                disableElevation
                                                onClick={onPaymentModeClickHanlder(paymentMethod)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <CheckoutSaleSummaryView
                                    viewMode={summaryViewMode}
                                    proceedCallback={onCheckoutClickHandler}
                                />
                            </div>
                        </div>
                    </div>
                </SliderModalBody>
            </SliderModalLayoutWrapper>
        </SliderModal>
    );
};
