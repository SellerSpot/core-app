import { PageWithMenu } from 'components/Atoms/PageWithMenu/PageWithMenu';
import { ROUTES } from 'config/routes';
import { BillSettings } from 'pages/PointOfSale/BillSettings/BillSettings';
import { Inventory } from 'pages/PointOfSale/Inventory/Inventory';
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
                    <Route exact path={ROUTES.POINT_OF_SALE__INVENTORY}>
                        <Inventory />
                    </Route>
                    <Route exact path={ROUTES.POINT_OF_SALE__BILL_SETTINGS}>
                        <BillSettings />
                    </Route>
                    <Route>
                        <Redirect to={ROUTES.POINT_OF_SALE__SALES__NEW_SALE} />
                    </Route>
                </Switch>
            </div>
        </PageWithMenu>
    );
};
