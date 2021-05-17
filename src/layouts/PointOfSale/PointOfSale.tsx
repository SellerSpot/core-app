import {
    PageWithMenu,
    PageWithMenuLHS,
    PageWithMenuRHS,
} from 'components/Atoms/PageWithMenu/PageWithMenu';
import { NewSale } from 'pages/PointOfSale/NewSale/NewSale';
import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router';
import { SubMenuManager } from './Components/SubMenuManager/SubMenuManager';

export const PointOfSale = (): ReactElement => {
    return (
        <PageWithMenu>
            <PageWithMenuLHS>
                <SubMenuManager />
            </PageWithMenuLHS>
            <PageWithMenuRHS>
                <Switch>
                    <Route>
                        <NewSale />
                    </Route>
                </Switch>
            </PageWithMenuRHS>
        </PageWithMenu>
    );
};
