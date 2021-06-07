import { PageWithMenu } from 'components/Atoms/PageWithMenu/PageWithMenu';
import { ROUTES } from 'config/routes';
import React, { ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { SubMenuManager } from './Components/SubMenuManager/SubMenuManager';
import { Settings } from '../../pages/Management/Settings/Settings';
import { Billing } from 'pages/Management/Billing/Billing';

export const Management = (): ReactElement => {
    return (
        <PageWithMenu>
            <SubMenuManager />
            <Switch>
                <Route exact path={ROUTES.MANAGEMENT__INSTALLED_PLUGINS}>
                    <h6>Installed Plugins</h6>
                </Route>
                <Route exact path={ROUTES.MANAGEMENT__PLUGIN_STORE}>
                    <h6>Plugin Store</h6>
                </Route>
                <Route exact path={ROUTES.MANAGEMENT__DOMAIN_SETTINGS}>
                    <h6>Domain Settings</h6>
                </Route>
                <Route exact path={ROUTES.MANAGEMENT__BILLING}>
                    <Billing />
                </Route>
                <Route exact path={ROUTES.MANAGEMENT__SETTINGS}>
                    <Settings />
                </Route>
                <Route>
                    <Redirect to={ROUTES.MANAGEMENT__INSTALLED_PLUGINS} />
                </Route>
            </Switch>
        </PageWithMenu>
    );
};
