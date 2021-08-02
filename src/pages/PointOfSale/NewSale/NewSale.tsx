import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { ICONS } from 'utilities/utilities';
import { ROUTES } from 'config/routes';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import styles from './NewSale.module.scss';

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
                        label={'SALES HISTORY'}
                        variant="contained"
                        theme="primary"
                        startIcon={<Icon icon={ICONS.baselineBackupRestore} />}
                        onClick={onNewSaleClickHandler}
                    />,
                ]}
            />
            <div className={styles.contentWrapper}></div>
        </div>
    );
};
