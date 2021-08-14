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
import { CheckoutSliderModalService } from './CheckoutSliderModal.service';
import { rawClone } from 'utilities/general';

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

    // compute
    const { sliderTitle, summaryViewMode } = CheckoutSliderModalService.getComputedViewMode();

    const rawNewSaleData = rawClone(saleData.get());

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
                                <BillA4
                                    data={rawNewSaleData}
                                    settings={Dummies.billSettings.getBillSettings().bills.BILL_A4}
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
