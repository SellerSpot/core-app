import { PageWithMenu } from 'components/Atoms/PageWithMenu/PageWithMenu';
import { ROUTES } from 'config/routes';
import { Brands } from 'pages/Catalogue/Brands/Brands';
import { TaxSettings } from 'pages/Catalogue/TaxSettings/TaxSettings';
import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Categories } from '../../pages/Catalogue/Categories/Categories';
import { StockUnits } from '../../pages/Catalogue/StockUnits/StockUnits';
import { SubMenuManager } from './Components/SubMenuManager/SubMenuManager';

export const Catalogue = (): ReactElement => {
    return (
        <PageWithMenu>
            <SubMenuManager />
            <Switch>
                <Route exact path={ROUTES.CATALOGUE__PRODUCTS}>
                    <h6>Products</h6>
                </Route>
                <Route exact path={ROUTES.CATALOGUE__BRANDS}>
                    <Brands />
                </Route>
                <Route exact path={ROUTES.CATALOGUE__CATEGORIES}>
                    <Categories />
                </Route>
                <Route exact path={ROUTES.CATALOGUE__STOCKUNITS}>
                    <StockUnits />
                </Route>
                <Route exact path={ROUTES.CATALOGUE__TAXBRACKETS}>
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
