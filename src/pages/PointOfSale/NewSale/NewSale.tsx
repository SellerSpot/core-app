import React, { ReactElement, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { NewSaleService } from './NewSale.service';
import { createState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { ICONS } from 'utilities/utilities';
import { ROUTES } from 'config/routes';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import styles from './NewSale.module.scss';
import { CheckoutSliderModal } from './components/CheckoutSliderModal/CheckoutSliderModal';
import { ParkedSalesSliderModal } from './components/ParkedSalesSliderModal/ParkedSalesSliderModal';
import { NewSaleSearchSection } from './components/NewSaleSearchSection/NewSaleSearchSection';
import { NewSaleCartSection } from './components/NewSaleCartSection/NewSaleCartSection';
import { INewSaleState } from './NewSale.types';

export const newSaleState = createState<INewSaleState>(NewSaleService.getNewSaleInitialState());

export const NewSale = (): ReactElement => {
    // hooks
    const history = useHistory();
    const searchFieldRef = useRef<HTMLDivElement>(null);

    // effects
    useEffect(() => {
        NewSaleService.computeSalePayment(); // onMount, if any previous state exists asynchronusly trigger sale payment totals update
    }, []);

    // handlers
    const onSalesHistoryClickHanlder = () =>
        history.push(ROUTES.POINT_OF_SALE__SALES__SALES_HISTORY);

    const searchFieldFocusTriggerer = () => {
        searchFieldRef.current.focus();
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
                            onClick={onSalesHistoryClickHanlder}
                        />,
                    ]}
                />
                <div className={styles.contentWrapper}>
                    <NewSaleSearchSection ref={searchFieldRef} />
                    <NewSaleCartSection searchFieldFocusTriggerer={searchFieldFocusTriggerer} />
                </div>
            </div>
            {/* modals */}
            <CheckoutSliderModal />
            <ParkedSalesSliderModal />
        </>
    );
};
