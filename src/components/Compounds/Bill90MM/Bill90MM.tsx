import React, { ReactElement } from 'react';
import styles from './Bill90MM.module.scss';
import { IBill90MMProps } from './Bill90MM.types';
import { Bill90MMHeader } from './Components/Bill90MMHeader/Bill90MMHeader';
import { Bill90MMProductsListing } from './Components/Bill90MMProductsListing/Bill90MMProductsListing';
import { Bill90MMSummary } from './Components/Bill90MMSummary/Bill90MMSummary';
// import { Bill90MMFooter } from './Components/Bill90MMFooter/Bill90MMFooter';

export const Bill90MM = (props: IBill90MMProps): ReactElement => {
    const { data, settings } = props;
    return (
        <div className={styles.billWrapper}>
            <Bill90MMHeader data={data} settings={settings} />
            <Bill90MMProductsListing data={data} settings={settings} />
            <Bill90MMSummary data={data} settings={settings} />
            {/* <Bill90MMFooter data={data} settings={settings} /> */}
        </div>
    );
};
