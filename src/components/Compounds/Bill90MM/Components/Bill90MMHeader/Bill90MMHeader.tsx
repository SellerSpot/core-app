import React, { ReactElement } from 'react';
import { IBill90MMChildProps } from '../../Bill90MM.types';
import styles from './Bill90MMHeader.module.scss';

export const Bill90MMHeader = (props: IBill90MMChildProps): ReactElement => {
    const { data, settings } = props;
    const { storeDetails } = settings;
    const { name: storeName, address: storeAddress } = storeDetails;
    const { grandTotal } = data.payment;
    return (
        <>
            <div className={styles.storeNameWrapper}>
                <p>{storeName}</p>
            </div>
            <div className={styles.headerMessageWrapper}>
                <p>{storeAddress}</p>
            </div>
            <div className={styles.totalHeaderWrapper}>
                <p className={styles.totalHeaderTitle}>TOTAL</p>
                <p className={styles.totalHeaderValue}>{grandTotal}</p>
            </div>
        </>
    );
};
