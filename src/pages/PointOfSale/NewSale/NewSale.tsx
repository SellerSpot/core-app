import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import Icon from '@iconify/react';
import { Button, InputField } from '@sellerspot/universal-components';
import { ICONS } from 'utilities/utilities';
import { ROUTES } from 'config/routes';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import styles from './NewSale.module.scss';
import SaleSearchResultCard from './components/SaleSearchResultCard/SaleSearchResultCard';
import { NoImagePlaceholder } from 'assets/images/images';
import CartTable from './components/CartTable/CartTable';
import { CheckoutSaleSummaryView } from './components/CheckoutSaleSummaryView/CheckoutSaleSummaryView';

export const NewSale = (): ReactElement => {
    // hooks
    const history = useHistory();

    // handlers
    const onNewSaleClickHandler = () => history.push(ROUTES.POINT_OF_SALE__SALES__SALES_HISTORY);

    return (
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
                            productImage={NoImagePlaceholder}
                            productName={'Tomato'}
                            stockUnit={'kg'}
                            unitPrice={20}
                        />
                        <SaleSearchResultCard
                            productImage={NoImagePlaceholder}
                            productName={'Tomato'}
                            stockUnit={'kg'}
                            unitPrice={20}
                        />
                    </div>
                </div>
                <div className={styles.cartSectionWrapper}>
                    <div className={styles.cartActionsWrapper}>
                        <Button
                            key="sales-history"
                            label="Retrieve sale"
                            variant="contained"
                            theme="primary"
                            fullWidth={true}
                            startIcon={<Icon icon={ICONS.baselineBackupRestore} />}
                            onClick={onNewSaleClickHandler}
                        />
                        <Button
                            key="sales-history"
                            label="Park sale"
                            fullWidth={true}
                            variant="contained"
                            theme="primary"
                            startIcon={<Icon icon={ICONS.baselineBackupRestore} />}
                            onClick={onNewSaleClickHandler}
                        />
                        <Button
                            key="sales-history"
                            label="More actions"
                            fullWidth={true}
                            variant="contained"
                            theme="primary"
                            startIcon={<Icon icon={ICONS.baselineBackupRestore} />}
                            onClick={onNewSaleClickHandler}
                        />
                    </div>
                    <div className={styles.cartTableWrapper}>
                        <CartTable />
                    </div>
                    <CheckoutSaleSummaryView
                        grandTotal={0}
                        completeSaleCallback={undefined}
                        subTotal={0}
                        totalDiscount={0}
                        totalTaxes={0}
                    />
                </div>
            </div>
        </div>
    );
};
