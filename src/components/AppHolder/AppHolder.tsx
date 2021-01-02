import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons';
import { getAppHolderStyles } from './appholder.styles';

export const AppHolder = (): ReactElement => {
    const styles = getAppHolderStyles();

    return (
        <div className={styles.appHolderWrapper}>
            <div className={styles.iconHolder}>
                <ICONS.CASH_REGISTER />
            </div>
            <div className={styles.titleHolder}>Point of Sale</div>
            <div className={styles.descriptionHolder}>
                Advanced Billing and Inventory Mangement Application.
            </div>
        </div>
    );
};
