import React, { ReactElement } from 'react';
import { useState } from '@hookstate/core';
import {
    showNotify,
    SliderModal,
    SliderModalBody,
    SliderModalHeader,
    SliderModalLayoutWrapper,
} from '@sellerspot/universal-components';
import { newSaleState } from '../../NewSale';
import { CheckoutSaleSummaryView } from '../CheckoutSaleSummaryView/CheckoutSaleSummaryView';
import styles from './CheckoutSliderModal.module.scss';
import { CheckoutSliderModalService } from './CheckoutSliderModal.service';
import { CheckoutCustomerDetailsGroup } from './components/CheckoutCustomerDetailsGroup';
import { CheckoutSliderBillPreview } from './components/CheckoutSliderBillPreview';
import { CheckoutBillSettingsGroup } from './components/CheckoutBillSettingsGroup';
import { CheckoutPaymentGroup } from './components/CheckoutPaymentGroup';
import { NewSaleService } from '../../NewSale.service';
import { useRef } from 'react';
import { TBillHolderRefProps } from 'components/Compounds/BillHolder/BillHolder.types';
import { ESaleStatus } from '@sellerspot/universal-types';

interface ICheckoutSliderModalProps {
    searchFieldFocusTriggerer: () => void;
}

export const CheckoutSliderModal = (props: ICheckoutSliderModalProps): ReactElement => {
    // props
    const { searchFieldFocusTriggerer } = props;
    // state
    const checkoutModal = useState(newSaleState.modals.checkout);
    const saleData = useState(newSaleState.saleData);

    // refs
    const billHolderRef = useRef<TBillHolderRefProps>(null);

    // handlers
    const modalGoBackHandler = (clearNewSaleState = false) => {
        // go back logic
        if (clearNewSaleState) {
            // ask confirmation if the status of the sale is not fulfulled
            NewSaleService.resetDynamicStateData();
            searchFieldFocusTriggerer();
        } else {
            checkoutModal.set(false);
        }
    };

    const onCheckoutClickHandler = () => {
        try {
            // trigger the loader until the checkout process completion
            NewSaleService.completeCheckout().then(() => {
                showNotify('Checkout Complete!');
            });
        } catch (error) {
            showNotify(error?.message ?? 'Something went wrong!');
        }
    };

    const onParkSaleClickHandler = () => {
        try {
            // trigger the loader until the checkout process completion
            NewSaleService.completeParkSale().then(() => {
                showNotify('Sale has been parked!');
                modalGoBackHandler(true);
            });
        } catch (error) {
            showNotify(error?.message ?? 'Something went wrong!');
        }
    };

    const onPrintBillClickHandler = async () => {
        const isPrintComplete = await billHolderRef.current.triggerPrint();
        if (isPrintComplete) modalGoBackHandler(true);
    };

    const getOnProceedClickHandler = () => {
        switch (saleData.status.get()) {
            case ESaleStatus.COMPLETED:
            case ESaleStatus.QUOTED:
                return onPrintBillClickHandler;
            case ESaleStatus.PARKED:
                return onParkSaleClickHandler;
            default:
                return onCheckoutClickHandler;
        }
    };

    // compute
    const { sliderTitle, summaryViewMode } = CheckoutSliderModalService.getComputedViewMode();

    // draw
    return (
        <SliderModal showModal={checkoutModal.get()} type="fixed" width="70%">
            <SliderModalLayoutWrapper>
                <SliderModalHeader
                    modalGoBackCallback={() => modalGoBackHandler()}
                    modalGoBackText="Go back to cart"
                    title={sliderTitle}
                    titlePlacement="center"
                />
                <SliderModalBody>
                    <div className={styles.bodyWrapper}>
                        <div className={styles.billSectionWrapper}>
                            <CheckoutSliderBillPreview ref={billHolderRef} />
                        </div>
                        <div className={styles.actionsSectionWrapper}>
                            <div className={styles.actionSettingsWrapper}>
                                <CheckoutBillSettingsGroup />
                                <CheckoutCustomerDetailsGroup />
                            </div>
                            <div className={styles.checkoutWrapper}>
                                <CheckoutPaymentGroup />
                                <CheckoutSaleSummaryView
                                    viewMode={summaryViewMode}
                                    proceedCallback={getOnProceedClickHandler()}
                                />
                            </div>
                        </div>
                    </div>
                </SliderModalBody>
            </SliderModalLayoutWrapper>
        </SliderModal>
    );
};
