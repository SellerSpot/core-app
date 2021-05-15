import React, { ReactElement } from 'react';
import styles from './BillA4TermsAndSignature.module.scss';
import mainStyles from '../../BillA4.module.scss';

export const BillA4TermsAndSignature = (): ReactElement => {
    return (
        <>
            <div className={mainStyles.advertisementAndGrandTotalWrapper}>
                <div></div>
                <div className={mainStyles.grandTotalWrapper}>
                    <div className={mainStyles.grandTotalHolder}>
                        <div className={mainStyles.grandTotalTitle}>
                            <h6>Total Tax</h6>
                        </div>
                        <div className={mainStyles.grandTotalValue}>
                            <h6>₹ 717.30</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.termsAndSignatureWrapper}>
                <div className={styles.termsAreaHolder}>
                    <div className={styles.termsAreaTitle}>
                        <h6>{'Terms & Conditions'}</h6>
                    </div>
                    <div>
                        <h6>{'1. Bill should be needed for return products.'}</h6>
                    </div>
                    <div>
                        <h6>{'2. Food products cannot be replaced.'}</h6>
                    </div>
                </div>
                <div className={styles.signatureAreaHolder}>
                    <div className={styles.termsAreaTitle}>
                        <h6>Signature</h6>
                    </div>
                </div>
            </div>
        </>
    );
};
