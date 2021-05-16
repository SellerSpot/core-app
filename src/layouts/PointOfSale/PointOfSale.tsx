import { NewSale } from 'pages/PointOfSale/NewSale/NewSale';
import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router';
import styles from './PointOfSale.module.scss';

export const PointOfSale = (): ReactElement => {
    // <TwoColumnLayout>
    //     <ColumnOne></ColumnOne>
    //     <ColumnTwo></ColumnTwo>
    // </TwoColumnLayout>
    return (
        <div className={styles.pointOfSaleWrapper}>
            <div className={styles.navigationWrapper}>left nav</div>
            <div className={styles.bodyWrapper}>
                <div className={styles.bodyContentWrapper}>
                    <Switch>
                        <Route>
                            <NewSale />
                            {/* pages goes */}
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};
