import React, { ReactElement } from 'react';
import styles from './BillA4.module.scss';
import dummyLogo from './logo.png';
import { IBillA4Props } from './BillA4.types';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@sellerspot/universal-components';
export { IBillA4Props } from './BillA4.types';

export const BillA4 = (props: IBillA4Props): ReactElement => {
    const { billReference } = props;
    const handlePrint = useReactToPrint({
        content: () => billReference.current,
    });
    return (
        <>
            <Button label={'Print'} onClick={handlePrint} />
            <div ref={billReference} className={styles.billWrapper}>
                <div className={styles.billHeader}>
                    <div className={styles.storeDetailsWrapper}>
                        <img className={styles.storeLogo} src={dummyLogo} alt={'Logo'} />
                        <div className={styles.storeDetails}>
                            <div className={styles.storeName}>Store Name</div>
                            <div className={styles.storeAddress}>
                                <div>12 A, New Raja Colony, Bheemanagar, Balajinagar, Trichy 1</div>
                                <div>0431 2411562 / +91 8903307270</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.billInvoiceDetailsWrapper}>
                        <div className={styles.billInvoiceDetails}>
                            <div className={styles.billInvoiceDetailsTitleHolder}>GST No:</div>
                            <div className={styles.billInvoiceDetailsValueHolder}>
                                22AAAAA0000A1Z5
                            </div>
                        </div>
                        <div className={styles.billInvoiceDetails}>
                            <div className={styles.billInvoiceDetailsTitleHolder}>
                                Invoice Date:
                            </div>
                            <div className={styles.billInvoiceDetailsValueHolder}>10/11/2020</div>
                        </div>
                        <div className={styles.billInvoiceDetails}>
                            <div className={styles.billInvoiceDetailsTitleHolder}>
                                Invoice Number:
                            </div>
                            <div className={styles.billInvoiceDetailsValueHolder}>IND123</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
