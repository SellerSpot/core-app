import { MenuWithPage } from 'components/Atoms/PageWithMenu/PageWithMenu';
import { NewSale } from 'pages/PointOfSale/NewSale/NewSale';
import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router';
import { SubMenuManager } from './Components/SubMenuManager/SubMenuManager';
import styles from './PointOfSale.module.scss';

export const PointOfSale = (): ReactElement => {
    return (
        <MenuWithPage>
            <div className={styles.menuWrapper}>
                <SubMenuManager />
            </div>
            <div className={styles.pageWrapper}>
                <Switch>
                    <Route>
                        <NewSale />
                    </Route>
                </Switch>
            </div>
        </MenuWithPage>
    );
};
