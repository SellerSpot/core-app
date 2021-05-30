import { PageWithMenu } from 'components/Atoms/PageWithMenu/PageWithMenu';
import { ROUTES } from 'config/routes';
import React, { ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { SubMenuManager } from './Components/SubMenuManager/SubMenuManager';
import styles from './Management.module.scss';

export const Management = (): ReactElement => {
    return (
        <PageWithMenu>
            <div className={styles.menuWrapper}>
                <SubMenuManager />
            </div>
            <div className={styles.pageWrapper}>
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
                        <h6>Billing</h6>
                    </Route>
                    <Route exact path={ROUTES.MANAGEMENT__SETTINGS}>
                        <h6>Settings</h6>
                    </Route>
                    <Route>
                        <Redirect to={ROUTES.MANAGEMENT__INSTALLED_PLUGINS} />
                    </Route>
                </Switch>
            </div>
        </PageWithMenu>
    );
};
