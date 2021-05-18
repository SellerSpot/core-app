import React, { ReactElement } from 'react';
import { IBill90MMProps } from '../../Bill90MM';
import styles from './Bill90MMHeader.module.scss';

export const Bill90MMHeader = (props: { billData: IBill90MMProps['billData'] }): ReactElement => {
    const { billData } = props;
    const { saleTotal, headerMessage, storeName } = billData;
    return (
        <>
            <div className={styles.storeNameWrapper}>
                <p>{storeName}</p>
            </div>
            <div className={styles.headerMessageWrapper}>
                <p>{headerMessage}</p>
            </div>
            <div className={styles.totalHeaderWrapper}>
                <p className={styles.totalHeaderTitle}>TOTAL</p>
                <p className={styles.totalHeaderValue}>{saleTotal}</p>
            </div>
        </>
    );
};
