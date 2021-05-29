import React, { ReactElement } from 'react';
import styles from './BillA4Header.module.scss';
import dummyLogo from '../../logo.png';
import { BillA4HeaderInvoice } from './Components/BillA4HeaderInvoice';
import { Image } from '@sellerspot/universal-components';

export const BillA4Header = (): ReactElement => {
    return (
        <div className={styles.billHeader}>
            <div className={styles.storeDetailsWrapper}>
                <Image className={styles.storeLogo} src={dummyLogo} />
                <div className={styles.storeDetails}>
                    <div className={styles.storeName}>Store Name</div>
                    <div className={styles.storeAddress}>
                        <h6>12 A, New Raja Colony, Bheemanagar, Balajinagar, Trichy 1</h6>
                        <h6>0431 2411562 / +91 8903307270</h6>
                    </div>
                </div>
            </div>
            <BillA4HeaderInvoice />
        </div>
    );
};
