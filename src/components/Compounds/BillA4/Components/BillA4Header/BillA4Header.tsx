import React, { ReactElement } from 'react';
import styles from './BillA4Header.module.scss';
import dummyLogo from '../../logo.png';
import { BillA4HeaderInvoice } from './Components/BillA4HeaderInvoice';
import { Image } from '@sellerspot/universal-components';
import { IBillA4ChildProps } from '../../BillA4.types';

export const BillA4Header = (props: IBillA4ChildProps): ReactElement => {
    const { settings } = props;
    const { storeDetails } = settings;
    return (
        <div className={styles.billHeader}>
            <div className={styles.storeDetailsWrapper}>
                <Image className={styles.storeLogo} src={dummyLogo} />
                <div className={styles.storeDetails}>
                    <div className={styles.storeName}>{storeDetails.name}</div>
                    <div className={styles.storeAddress}>
                        <h6>{storeDetails.address}</h6>
                    </div>
                </div>
            </div>
            <BillA4HeaderInvoice {...props} />
        </div>
    );
};
