import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { ICONS } from 'utilities/utilities';
import { ROUTES } from 'config/routes';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import styles from './NewSale.module.scss';
import { CheckoutSliderModal } from './components/CheckoutSliderModal/CheckoutSliderModal';
import { useState } from '@hookstate/core';
import { ParkedSalesSliderModal } from './components/ParkedSalesSliderModal/ParkedSalesSliderModal';
import { ISaleData } from '@sellerspot/universal-types';
import { NewSaleService } from './NewSale.service';
import { NewSaleSearchSection } from './components/NewSaleSearchSection/NewSaleSearchSection';
import { NewSaleCartSection } from './components/NewSaleCartSection/NewSaleCartSection';
import { INewSaleModals } from './NewSale.types';

export const NewSale = (): ReactElement => {
    // state
    const modals = useState<INewSaleModals>({
        checkout: false,
        parkedSales: false,
    } as INewSaleModals);
    const saleData = useState<ISaleData>(NewSaleService.getInitialSaleDataState());

    // hooks
    const history = useHistory();

    // handlers
    const onSalesHistoryClickHanlder = () =>
        history.push(ROUTES.POINT_OF_SALE__SALES__SALES_HISTORY);

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
                            onClick={onSalesHistoryClickHanlder}
                        />,
                    ]}
                />
                <div className={styles.contentWrapper}>
                    <NewSaleSearchSection saleData={saleData} />
                    <NewSaleCartSection saleData={saleData} modals={modals} />
                </div>
            </div>
            {/* modals */}
            <CheckoutSliderModal checkoutModal={modals.checkout} />
            <ParkedSalesSliderModal parkedSalesModal={modals.parkedSales} />
        </>
    );
};
