import Icon from '@iconify/react';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import { Button } from '@sellerspot/universal-components';
import CartTable from './components/CartTable/CartTable';
import { CheckoutSaleSummaryView } from '../CheckoutSaleSummaryView/CheckoutSaleSummaryView';
import styles from './NewSaleCartSection.module.scss';
import { State } from '@hookstate/core';
import { ISaleData } from '@sellerspot/universal-types';
import { INewSaleModals } from '../../NewSale.types';

interface INewSaleCartSectionProps {
    saleData: State<ISaleData>;
    modals: State<INewSaleModals>;
    searchFieldFocusTriggerer: () => void;
}

export const NewSaleCartSection = (props: INewSaleCartSectionProps): ReactElement => {
    // props
    const { modals, saleData, searchFieldFocusTriggerer } = props;

    // state

    // handlers
    const onRetrieveSaleClickHandler = () => modals.parkedSales.set(true);
    const onNewSaleClickHandler = () => {
        // reset the cart table state, get confirmations from the user before clearing
    };
    const onCheckoutClickHandler = () => {
        modals.checkout.set(true);
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
                    onClick={onNewSaleClickHandler}
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
                    onClick={onNewSaleClickHandler}
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
                    onClick={onNewSaleClickHandler}
                    disableElevation
                    size="large"
                    whiteSpaceNoWrap
                />
            </div>
            <div className={styles.cartTableWrapper}>
                <CartTable
                    cartData={saleData.cart}
                    searchFieldFocusTriggerer={searchFieldFocusTriggerer}
                />
            </div>
            <div className={styles.cartSummaryWrapper}>
                <CheckoutSaleSummaryView
                    grandTotal={saleData.payment.grandTotal.get()}
                    subTotal={saleData.payment.subTotal.get()}
                    totalDiscount={saleData.payment.totalDiscount.get()}
                    totalTaxes={saleData.payment.totalTax.get()}
                    viewMode="cart"
                    proceedCallback={onCheckoutClickHandler}
                />
            </div>
        </div>
    );
};
