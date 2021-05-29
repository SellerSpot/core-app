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
            <Switch>
                <Route path={ROUTES.MANAGEMENT__INSTALLED_PLUGINS}>
                    <div className={styles.pageWrapper}>
                        <h6>Installed Plugins</h6>
                    </div>
                </Route>
                <Route path={ROUTES.MANAGEMENT__PLUGIN_STORE}>
                    <div className={styles.pageWrapper}>
                        <h6>Plugin Store</h6>
                    </div>
                </Route>
                <Route path={ROUTES.MANAGEMENT__DOMAIN_SETTINGS}>
                    <div className={styles.pageWrapper}>
                        <h6>Domain Settings</h6>
                    </div>
                </Route>
                <Route path={ROUTES.MANAGEMENT__BILLING}>
                    <div className={styles.pageWrapper}>
                        <h6>Billing</h6>
                    </div>
                </Route>
                <Route path={ROUTES.MANAGEMENT__SETTINGS}>
                    <div className={styles.pageWrapper}>
                        <h6>Settings</h6>
                    </div>
                </Route>
                <Route>
                    <Redirect to={ROUTES.MANAGEMENT__INSTALLED_PLUGINS} />
                </Route>
            </Switch>
        </PageWithMenu>
    );
};
