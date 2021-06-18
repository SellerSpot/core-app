import { PageWithMenu } from 'components/Atoms/PageWithMenu/PageWithMenu';
import { ROUTES } from 'config/routes';
import React, { ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { SubMenuManager } from './Components/SubMenuManager/SubMenuManager';
import styles from './PointOfSale.module.scss';

export const PointOfSale = (): ReactElement => {
    return (
        <PageWithMenu>
            <div className={styles.menuWrapper}>
                <SubMenuManager />
            </div>
            <div className={styles.pageWrapper}>
                <Switch>
                    <Route exact path={ROUTES.POINT_OF_SALE__SALES__NEW_SALE}>
                        <h6>New Sale</h6>
                    </Route>
                    <Route exact path={ROUTES.POINT_OF_SALE__SALES__SALES_HISTORY}>
                        <h6>Sales History</h6>
                    </Route>
                    <Route exact path={ROUTES.POINT_OF_SALE__INVENTORY__PRODUCTS}>
                        <h6>Inventory Products</h6>
                    </Route>
                    <Route exact path={ROUTES.POINT_OF_SALE__BILL_SETTINGS}>
                        <h6>Bill Settings</h6>
                    </Route>
                    <Route>
                        <Redirect to={ROUTES.POINT_OF_SALE__SALES__NEW_SALE} />
                    </Route>
                </Switch>
            </div>
        </PageWithMenu>
    );
};
