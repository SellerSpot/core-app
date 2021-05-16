import React, { ReactElement } from 'react';
import styles from './PointOfSale.module.scss';

export const PointOfSale = (): ReactElement => {
    // <TwoColumnLayout>
    //     <ColumnOne></ColumnOne>
    //     <ColumnTwo></ColumnTwo>
    // </TwoColumnLayout>
    return (
        <div className={styles.pointOfSaleWrapper}>
            <div className={styles.navigationWrapper}>left nav</div>
            <div className={styles.bodyWrapper}>
                <div className={styles.bodyContentWrapper}>main page area area</div>
            </div>
        </div>
    );
};
