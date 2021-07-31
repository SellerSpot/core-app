import React, { ReactElement } from 'react';
import styles from './BillA4TermsAndSignature.module.scss';
import { IBillA4ChildProps } from '../../BillA4.types';

export const BillA4TermsAndSignature = (props: IBillA4ChildProps): ReactElement => {
    const {
        settings: { termsAndConditions, signature },
    } = props;
    return (
        <>
            <div className={styles.termsAndSignatureWrapper}>
                <div className={styles.termsAreaHolder}>
                    {termsAndConditions.show && (
                        <>
                            <div className={styles.termsAreaTitle}>
                                <h6>Terms &amp; Conditions</h6>
                            </div>
                            <div>
                                <h6>{termsAndConditions.data}</h6>
                            </div>
                        </>
                    )}
                </div>
                <div className={styles.signatureAreaHolder}>
                    {signature.authorised && (
                        <div className={styles.termsAreaTitle}>
                            <h6>Authorised signature</h6>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
