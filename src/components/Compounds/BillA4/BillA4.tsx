import React, { ReactElement } from 'react';
import styles from './BillA4.module.scss';

import { IBillA4Props } from './BillA4.types';
import { BillA4Header } from './Components/BillA4Header/BillA4Header';
import { BillA4PurchaseInvoice } from './Components/BillA4PurchaseInvoice/BillA4PurchaseInvoice';
import { BillA4Summary } from './Components/BillA4Summary/BillA4Summary';
import { BillA4TaxSplitup } from './Components/BillA4TaxSplitup/BillA4TaxSplitup';
import { BillA4TermsAndSignature } from './Components/BillA4TermsAndSignature/BillA4TermsAndSignature';
export { IBillA4Props } from './BillA4.types';

const PageBreak = () => <div className={styles.PageBreak} />;

export const BillA4 = (props: IBillA4Props): ReactElement => {
    const { billReference } = props;
    return (
        <div ref={billReference} className={styles.billWrapper}>
            <BillA4Header />
            <BillA4PurchaseInvoice />
            <PageBreak />
            <BillA4Summary />
            <PageBreak />
            <BillA4TaxSplitup />
            <PageBreak />
            <BillA4TermsAndSignature />
        </div>
    );
};
