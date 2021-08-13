import React, { ReactElement } from 'react';
import {
    Button,
    InputField,
    Select,
    SliderModal,
    SliderModalBody,
    SliderModalHeader,
    SliderModalLayoutWrapper,
    Switch,
} from '@sellerspot/universal-components';
import styles from './CheckoutSliderModal.module.scss';
import { BillHolder } from 'components/Compounds/BillHolder/BillHolder';
import { BillA4 } from 'components/Compounds/BillA4/BillA4';
import { Dummies } from 'dummies/Dummies';
import { BillSettingsService } from 'pages/PointOfSale/BillSettings/BillSettings.service';
import { CheckoutSaleSummaryView } from '../CheckoutSaleSummaryView/CheckoutSaleSummaryView';
import { useState } from '@hookstate/core';
import { newSaleState } from '../../NewSale';
import { ESaleStatus } from '@sellerspot/universal-types';

export const CheckoutSliderModal = (): ReactElement => {
    // state
    const checkoutModal = useState(newSaleState.modals.checkout);
    const saleData = useState(newSaleState.saleData);

    // handlers
    const modalGoBackHandler = () => {
        // go back logic
        checkoutModal.set(false);
    };

    const onCheckoutClickHandler = () => {
        // once checkout completed, go back to cart view, after clearing the cart state
        modalGoBackHandler();
    };

    const getSliderTitle = () => {
        let sliderTitle = '';
        // get the title based on the current state
        switch (saleData.status.get()) {
            case ESaleStatus.PARKED:
                sliderTitle = 'Park sale';
                break;
            case ESaleStatus.QUOTED:
                sliderTitle = 'Quote sale';
                break;
            default:
                sliderTitle = 'Checkout sale';
            // CHECKOUT FLOW
        }
        return sliderTitle;
    };

    // draw
    return (
        <SliderModal showModal={checkoutModal.get()} type="fixed" width="70%">
            <SliderModalLayoutWrapper>
                <SliderModalHeader
                    modalGoBackCallback={modalGoBackHandler}
                    modalGoBackText="Go back to cart"
                    title={getSliderTitle()}
                    titlePlacement="center"
                />
                <SliderModalBody>
                    <div className={styles.bodyWrapper}>
                        <div className={styles.billSectionWrapper}>
                            <BillHolder>
                                <BillA4
                                    settings={Dummies.billSettings.getBillSettings().bills.BILL_A4}
                                    data={Dummies.billSettings.getBillData()}
                                    dimension={BillSettingsService.billDimentsions.BILL_A4}
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
                                        value={BillSettingsService.billOptions[0]}
                                        isClearable={false}
                                    />
                                    <div className={styles.horizontalSectionSplit}>
                                        <div className={styles.horizontalSection}>
                                            <InputField
                                                type="text"
                                                label="Remark message"
                                                placeHolder={'Remark message / thank you'}
                                                multiline
                                                rows={2}
                                                theme="primary"
                                                disableHelperTextPlaceholderPadding
                                                fullWidth
                                            />
                                            <div className={styles.settingsGroup}></div>
                                        </div>
                                        <div className={styles.horizontalSection}>
                                            <div className={styles.settingsGroup}>
                                                <InputField
                                                    type="text"
                                                    label="Footer message"
                                                    placeHolder={'Footer message'}
                                                    multiline
                                                    rows={2}
                                                    theme="primary"
                                                    disableHelperTextPlaceholderPadding
                                                    fullWidth
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.settingsGroup}>
                                    <div className={styles.horizontalSplit}>
                                        <h4>Customer details</h4>
                                        <Switch checked={true} />
                                    </div>
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
                                                    required
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
                                </div>
                            </div>
                            <div className={styles.checkoutWrapper}>
                                <div className={styles.settingsGroup}>
                                    <h4>Payment mode</h4>
                                    <div className={styles.paymentModesWrapper}>
                                        <Button
                                            label="CASH"
                                            variant="contained"
                                            theme="primary"
                                            disableElevation
                                        />
                                        <Button
                                            label="CARD"
                                            variant="contained"
                                            theme="auto"
                                            disableElevation
                                        />
                                        <Button
                                            label="DUE"
                                            variant="contained"
                                            theme="auto"
                                            disableElevation
                                        />
                                    </div>
                                </div>
                                <CheckoutSaleSummaryView
                                    viewMode="checkout"
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
