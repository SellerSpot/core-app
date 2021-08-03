import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { ICONS } from 'utilities/utilities';
import { ROUTES } from 'config/routes';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import styles from './SalesHistory.module.scss';
import { SalesHistoryTable } from './components/SalesHistoryTable/SalesHistoryTable';

export const SalesHistory = (): ReactElement => {
    // hooks
    const history = useHistory();

    // handlers
    const onNewSaleClickHandler = () => history.push(ROUTES.POINT_OF_SALE__SALES__NEW_SALE);

    return (
        <div className={styles.wrapper}>
            <PageHeader
                title="Sales History"
                actions={[
                    <Button
                        key="new-sale"
                        label={'NEW SALE'}
                        variant="contained"
                        theme="primary"
                        startIcon={<Icon icon={ICONS.outlineAdd} />}
                        onClick={onNewSaleClickHandler}
                    />,
                ]}
            />
            <div className={styles.contentWrapper}>
                <SalesHistoryTable />
            </div>
        </div>
    );
};
