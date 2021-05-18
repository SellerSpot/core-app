import React, { ReactElement } from 'react';
import styles from './Bill90MM.module.scss';
import { IBill90MMProps } from './Bill90MM.types';
import { Bill90MMFooter } from './Components/Bill90MMFooter/Bill90MMFooter';
import { Bill90MMHeader } from './Components/Bill90MMHeader/Bill90MMHeader';
import { Bill90MMProductsListing } from './Components/Bill90MMProductsListing/Bill90MMProductsListing';
import { Bill90MMSummary } from './Components/Bill90MMSummary/Bill90MMSummary';
export { IBill90MMProps } from './Bill90MM.types';

export const Bill90MM = (props: IBill90MMProps): ReactElement => {
    const { billData, style, billReference } = props;
    return (
        <div ref={billReference} style={style} className={styles.billWrapper}>
            <Bill90MMHeader billData={billData} />
            <Bill90MMProductsListing billData={billData} />
            <Bill90MMSummary billData={billData} />
            <Bill90MMFooter billData={billData} />
        </div>
    );
};
