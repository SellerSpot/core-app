import { PageWithMenu } from 'components/Atoms/PageWithMenu/PageWithMenu';
import { ROUTES } from 'config/routes';
import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import styles from './Catalogue.module.scss';
import { SubMenuManager } from './Components/SubMenuManager/SubMenuManager';

export const Catalogue = (): ReactElement => {
    return (
        <PageWithMenu>
            <div className={styles.menuWrapper}>
                <SubMenuManager />
            </div>
            <div className={styles.pageWrapper}>
                <Switch>
                    <Route path={ROUTES.CATALOGUE__PRODUCTS}>
                        <div className={styles.pageWrapper}>
                            <h6>Products</h6>
                        </div>
                    </Route>
                    <Route path={ROUTES.CATALOGUE__BRANDS}>
                        <div className={styles.pageWrapper}>
                            <h6>Brands</h6>
                        </div>
                    </Route>
                    <Route path={ROUTES.CATALOGUE__CATEGORIES}>
                        <div className={styles.pageWrapper}>
                            <h6>Categories</h6>
                        </div>
                    </Route>
                    <Route path={ROUTES.CATALOGUE__STOCKUNITS}>
                        <div className={styles.pageWrapper}>
                            <h6>StockUnits</h6>
                        </div>
                    </Route>
                    <Route path={ROUTES.CATALOGUE__TAXBRACKETS}>
                        <div className={styles.pageWrapper}>
                            <h6>Tax Brackets</h6>
                        </div>
                    </Route>
                    <Route path={ROUTES.CATALOGUE__SETTINGS}>
                        <div className={styles.pageWrapper}>
                            <h6>Settings</h6>
                        </div>
                    </Route>
                    <Route>
                        <Redirect to={ROUTES.CATALOGUE__PRODUCTS} />
                    </Route>
                </Switch>
            </div>
        </PageWithMenu>
    );
};
