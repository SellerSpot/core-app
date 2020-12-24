import { initializeGlobals } from 'config/globalConfig';
import { ROUTES } from 'config/routes';
import { Auth } from 'layouts/Auth/Auth';
import { Dashboard } from 'layouts/Dashboard/Dashboard';
import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import './styles/index.css';

// application common initilizers goes here
initializeGlobals();

export const App = (): ReactElement => {
    return (
        <div className={`baseWrapper`}>
            <Switch>
                <Route path={ROUTES.Auth}>
                    <Auth />
                </Route>
                {/* all other routes should be nested above this route because it is '/' route hence should be placed atlast */}
                <Route path={ROUTES.DASHBOARD}>
                    <Dashboard />
                </Route>
            </Switch>
        </div>
    );
};
