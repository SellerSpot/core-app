import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import Icon from '@iconify/react';
import { Button, InputField } from '@sellerspot/universal-components';
import { ICONS } from 'utilities/utilities';
import { ROUTES } from 'config/routes';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import styles from './NewSale.module.scss';
import SaleSearchResultCard from './components/SaleSearchResultCard/SaleSearchResultCard';
import CartTable from './components/CartTable/CartTable';
import { CheckoutSaleSummaryView } from './components/CheckoutSaleSummaryView/CheckoutSaleSummaryView';
import { CheckoutSliderModal } from './components/CheckoutSliderModal/CheckoutSliderModal';
import { useState } from '@hookstate/core';
import { ParkedSalesSliderModal } from './components/ParkedSalesSliderModal/ParkedSalesSliderModal';

export const NewSale = (): ReactElement => {
    // state
    const checkoutModal = useState(false);
    const parkedSalesModal = useState(true);

    // hooks
    const history = useHistory();

    // handlers
    const onNewSaleClickHandler = () => history.push(ROUTES.POINT_OF_SALE__SALES__SALES_HISTORY);
    const onRetrieveSaleClickHandler = () => parkedSalesModal.set(true);

    return (
        <>
            <div className={styles.wrapper}>
                <PageHeader
                    title="New Sale"
                    actions={[
                        <Button
                            key="sales-history"
                            label="SALES HISTORY"
                            variant="contained"
                            theme="primary"
                            startIcon={<Icon icon={ICONS.baselineBackupRestore} />}
                            onClick={onNewSaleClickHandler}
                        />,
                    ]}
                />
                <div className={styles.contentWrapper}>
                    <div className={styles.searchSectionWrapper}>
                        <InputField
                            autoFocus={true}
                            label="Search for producst"
                            placeHolder="Start typing or scaning"
                            theme="primary"
                            size="medium"
                            fullWidth={true}
                            disableHelperTextPlaceholderPadding={true}
                            suffix={<Icon icon={ICONS.outlineSearch} />}
                        />
                        <div className={styles.searchResultSecitonWrapper}>
                            <SaleSearchResultCard
                                productImage={undefined}
                                productName={'Tomato'}
                                stockUnit={'kg'}
                                unitPrice={20}
                            />
                            <SaleSearchResultCard
                                productImage={undefined}
                                productName={'Tomato'}
                                stockUnit={'kg'}
                                unitPrice={20}
                            />
                        </div>
                    </div>
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
                            <CartTable />
                        </div>
                        <div className={styles.cartSummaryWrapper}>
                            <CheckoutSaleSummaryView
                                grandTotal={0}
                                subTotal={0}
                                totalDiscount={0}
                                totalTaxes={0}
                                viewMode="cart"
                                proceedCallback={() => checkoutModal.set(true)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* checkout slider modal */}
            <CheckoutSliderModal checkoutModal={checkoutModal} />
            <ParkedSalesSliderModal parkedSalesModal={parkedSalesModal} />
        </>
    );
};
