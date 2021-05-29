import React, { ReactElement } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PageWithMenu } from 'components/Atoms/PageWithMenu/PageWithMenu';
import { ROUTES } from 'config/routes';
import { NewSale } from 'pages/PointOfSale/NewSale/NewSale';
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
                        <NewSale />
                    </Route>
                    <Route>
                        <Redirect to={ROUTES.POS__SALES__NEW_SALE} />
                    </Route>
                </Switch>
            </div>
        </PageWithMenu>
    );
};
