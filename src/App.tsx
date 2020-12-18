import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import './styles/index.css';
import { ROUTES } from './config/routes';

export const App: FC = (): JSX.Element => {
    return (
        <div>
            <Switch>
                {/* all other routes should be nested above this route because it is '/' route hence should be placed atlast */}
                <Route path={ROUTES.DASHBOARD}>
                    <>SellerSpot Core Dashboard</>
                </Route>
            </Switch>
        </div>
    );
};
