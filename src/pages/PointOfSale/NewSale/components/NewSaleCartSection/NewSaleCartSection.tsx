import Icon from '@iconify/react';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import { Button } from '@sellerspot/universal-components';
import CartTable from './components/CartTable/CartTable';
import { CheckoutSaleSummaryView } from '../CheckoutSaleSummaryView/CheckoutSaleSummaryView';
import styles from './NewSaleCartSection.module.scss';
import { NewSaleService } from '../../NewSale.service';
import { newSaleState } from '../../NewSale';
import { useState } from '@hookstate/core';

interface INewSaleCartSectionProps {
    searchFieldFocusTriggerer: () => void;
}

export const NewSaleCartSection = (props: INewSaleCartSectionProps): ReactElement => {
    // props
    const { searchFieldFocusTriggerer } = props;

    // state
    const modals = useState(newSaleState.modals);

    // handlers
    const onRetrieveSaleClickHandler = () => {
        // retreive the earlier parked sale
        modals.parkedSales.set(true);
    };
    const onParkSaleClickHanlder = () => {
        // park the current sale for later use
        NewSaleService.parkSaleInitater();
    };
    const onQuoteSaleClickHanlder = () => {
        // reset the cart table state, get confirmations from the user before clearing
        NewSaleService.quoteSaleInitiator();
    };
    const onDiscardSaleClickHanlder = () => {
        // reset the cart table state, get confirmations from the user before clearing
        NewSaleService.resetSale();
        searchFieldFocusTriggerer();
    };
    const onCheckoutClickHandler = () => {
        // only open checkout modal, if cart has something in it
        NewSaleService.checkoutSaleInitiator();
    };

    return (
        <div className={styles.cartSectionWrapper}>
            <div className={styles.cartActionsWrapper}>
                <Button
                    label="Retrieve sale"
                    variant="contained"
                    theme="light"
                    fullWidth={true}
                    startIcon={<Icon icon={ICONS.baselineBackupRestore} />}
                    onClick={onRetrieveSaleClickHandler}
                    disableElevation
                    size="large"
                    whiteSpaceNoWrap
                />
                <Button
                    label="Park sale"
                    fullWidth={true}
                    variant="contained"
                    theme="light"
                    startIcon={<Icon icon={ICONS.roundRestore} />}
                    onClick={onParkSaleClickHanlder}
                    disableElevation
                    size="large"
                    whiteSpaceNoWrap
                />
                <Button
                    label="Quote sale"
                    fullWidth={true}
                    variant="contained"
                    theme="light"
                    startIcon={<Icon icon={ICONS.requestQuote} />}
                    onClick={onQuoteSaleClickHanlder}
                    disableElevation
                    size="large"
                    whiteSpaceNoWrap
                />
                <Button
                    label="Discard sale"
                    fullWidth={true}
                    variant="contained"
                    theme="light"
                    startIcon={<Icon icon={ICONS.bxReset} />}
                    onClick={onDiscardSaleClickHanlder}
                    disableElevation
                    size="large"
                    whiteSpaceNoWrap
                />
            </div>
            <div className={styles.cartTableWrapper}>
                <CartTable searchFieldFocusTriggerer={searchFieldFocusTriggerer} />
            </div>
            <div className={styles.cartSummaryWrapper}>
                <CheckoutSaleSummaryView viewMode="cart" proceedCallback={onCheckoutClickHandler} />
            </div>
        </div>
    );
};
