import { PageWithMenu } from 'components/Atoms/PageWithMenu/PageWithMenu';
import { ROUTES } from 'config/routes';
import { Brand } from 'pages/Catalogue/Brand/Brand';
import { Product } from 'pages/Catalogue/Product/Product';
import { TaxSettings } from 'pages/Catalogue/TaxSettings/TaxSettings';
import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Category } from '../../pages/Catalogue/Category/Category';
import { StockUnit } from '../../pages/Catalogue/StockUnit/StockUnit';
import { SubMenuManager } from './Components/SubMenuManager/SubMenuManager';

export const Catalogue = (): ReactElement => {
    return (
        <PageWithMenu>
            <SubMenuManager />
            <Switch>
                <Route exact path={ROUTES.CATALOGUE__PRODUCTS}>
                    <Product />
                </Route>
                <Route exact path={ROUTES.CATALOGUE__BRANDS}>
                    <Brand />
                </Route>
                <Route exact path={ROUTES.CATALOGUE__CATEGORIES}>
                    <Category />
                </Route>
                <Route exact path={ROUTES.CATALOGUE__STOCKUNITS}>
                    <StockUnit />
                </Route>
                <Route exact path={ROUTES.CATALOGUE__TAXSETTINGS}>
                    <TaxSettings />
                </Route>
                <Route exact path={ROUTES.CATALOGUE__SETTINGS}>
                    <h6>Settings</h6>
                </Route>
                <Route>
                    <Redirect to={ROUTES.CATALOGUE__PRODUCTS} />
                </Route>
            </Switch>
        </PageWithMenu>
    );
};
