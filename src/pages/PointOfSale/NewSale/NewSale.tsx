import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import Icon from '@iconify/react';
import { Button, IInputFieldProps, InputField } from '@sellerspot/universal-components';
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
import { IProductData, ISaleData } from '@sellerspot/universal-types';
import { NewSaleService } from './NewSale.service';

export const NewSale = (): ReactElement => {
    // state
    const checkoutModal = useState(false);
    const parkedSalesModal = useState(false);
    const searchQuery = useState('');
    const searchResult = useState<IProductData[]>([]);
    const saleData = useState<ISaleData>(NewSaleService.getInitialSaleDataState());

    // hooks
    const history = useHistory();

    // handlers
    const onNewSaleClickHandler = () => history.push(ROUTES.POINT_OF_SALE__SALES__SALES_HISTORY);
    const onRetrieveSaleClickHandler = () => parkedSalesModal.set(true);
    const onSearchInitaiteClickHandler = () => parkedSalesModal.set(true);
    const searchFieldOnChangeHandler: IInputFieldProps['onChange'] = (event) => {
        searchQuery.set(event.target.value);
    };

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
                            onChange={searchFieldOnChangeHandler}
                        />
                        {/* search initiate info block */}
                        {searchQuery.get().length === 0 && searchResult.get().length === 0 && (
                            <div className={styles.searchInitiateInfoHolder}>
                                <Icon
                                    icon={ICONS.outlineSearch}
                                    className={styles.searchInitiateSearchIconHolder}
                                />
                                <h5>Search / scan for products</h5>
                                <Button
                                    label="Search"
                                    theme="light"
                                    size="large"
                                    variant="contained"
                                    onClick={onSearchInitaiteClickHandler}
                                />
                            </div>
                        )}
                        {/* search results block */}
                        {searchResult.get().length > 0 && (
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
                        )}
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
                            <CartTable cartData={saleData.cart} />
                        </div>
                        <div className={styles.cartSummaryWrapper}>
                            <CheckoutSaleSummaryView
                                grandTotal={saleData.payment.grandTotal.get()}
                                subTotal={saleData.payment.subTotal.get()}
                                totalDiscount={saleData.payment.totalDiscount.get()}
                                totalTaxes={saleData.payment.totalTax.get()}
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
