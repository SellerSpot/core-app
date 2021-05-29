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
                    <Route path={ROUTES.POS__SALES__NEW_SALE}>
                        <div className={styles.pageWrapper}>
                            <h6>New Sale</h6>
                        </div>
                    </Route>
                    <Route path={ROUTES.POS__SALES__SALES_HISTORY}>
                        <div className={styles.pageWrapper}>
                            <h6>Sales History</h6>
                        </div>
                    </Route>
                    <Route path={ROUTES.POS__INVENTORY__PRODUCTS}>
                        <div className={styles.pageWrapper}>
                            <h6>Inventory Products</h6>
                        </div>
                    </Route>
                    <Route path={ROUTES.POS__BILL_SETTINGS}>
                        <div className={styles.pageWrapper}>
                            <h6>Bill Settings</h6>
                        </div>
                    </Route>
                    <Route>
                        <Redirect to={ROUTES.POS__SALES__NEW_SALE} />
                    </Route>
                </Switch>
            </div>
        </PageWithMenu>
    );
};
