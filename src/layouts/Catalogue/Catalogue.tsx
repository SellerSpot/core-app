import { PageWithMenu } from 'components/Atoms/PageWithMenu/PageWithMenu';
import { ROUTES } from 'config/routes';
import { CatalogueBrandsPage } from 'pages/Catalogue/Brands/CatalogueBrandsPage';
import React, { ReactElement } from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
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
                    <Route path={ROUTES.CATALOGUE.BRANDS}>
                        <CatalogueBrandsPage />
                    </Route>
                </Switch>
            </div>
        </PageWithMenu>
    );
};
