import React, { ReactElement } from 'react';
import styles from './BillA4.module.scss';
import { IBillA4Props } from './BillA4.types';

import { BillA4Header } from './Components/BillA4Header/BillA4Header';
import { BillA4PurchaseInvoice } from './Components/BillA4PurchaseInvoice/BillA4PurchaseInvoice';
import { BillA4Summary } from './Components/BillA4Summary/BillA4Summary';
import { BillA4TaxSplitup } from './Components/BillA4TaxSplitup/BillA4TaxSplitup';
import { BillA4TermsAndSignature } from './Components/BillA4TermsAndSignature/BillA4TermsAndSignature';
import { BillA4Footer } from './Components/BillA4Footer/BillA4Footer';
import { BillA4TaxInvoice } from './Components/BillA4TaxInvoice/BillA4TaxInvoice';

const PageBreak = () => <div className={styles.PageBreak} />;

export const BillA4 = (props: IBillA4Props): ReactElement => {
    const { data, settings } = props;
    return (
        <div className={styles.billWrapper}>
            <BillA4Header data={data} settings={settings} />
            <BillA4TaxInvoice data={data} settings={settings} />
            <BillA4PurchaseInvoice data={data} settings={settings} />
            <PageBreak />
            <BillA4Summary data={data} settings={settings} />
            <PageBreak />
            <BillA4TaxSplitup data={data} settings={settings} />
            <PageBreak />
            <BillA4TermsAndSignature data={data} settings={settings} />
            <BillA4Footer data={data} settings={settings} />
        </div>
    );
};
