import React, { ReactElement } from 'react';
import { Button } from '@sellerspot/universal-components';
import { ISalesHistoryTableProps } from '../SalesHistoryTable.types';
import styles from '../SalesHistoryTable.module.scss';

const Controls = (): ReactElement => {
    return (
        <>
            <Button
                fullWidth
                key={'editSaleControl'}
                label={'Edit Sale'}
                variant={'contained'}
                theme={'primary'}
            />
            <Button
                fullWidth
                key={'printRecieptControl'}
                label={'Print Reciept'}
                variant={'outlined'}
                theme={'primary'}
            />
            <Button
                fullWidth
                key={'voidSaleControl'}
                label={'Void Sale'}
                variant={'outlined'}
                theme={'danger'}
            />
        </>
    );
};

export const SalesHistoryProducts = (props: {
    products: Pick<ISalesHistoryTableProps['saleHistory'][0], 'products'>;
}): ReactElement => {
    const { products } = props;
    console.log(products);

    return (
        <div className={styles.collapsedContent}>
            <div className={styles.productsView}>Table</div>
            <div className={styles.controls}>
                <Controls />
            </div>
        </div>
    );
};
