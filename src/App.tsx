import { initializeGlobals } from 'config/globalConfig';
import { ROUTES } from 'config/routes';
import { Auth } from 'layouts/Auth/Auth';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { heartBeatSelector } from 'store/models/heartBeat';
import './styles/index.css';

// application common initilizers goes here
initializeGlobals();

export const App = (): ReactElement => {
    const hearBeatState = useSelector(heartBeatSelector);
    return (
        <div className={'baseWrapper'}>
            <Switch>
                <Route path={ROUTES.Auth}>
                    <Auth />
                </Route>
                {/* all other routes should be nested above this route because it is '/' route hence should be placed atlast */}
                <Route path={ROUTES.DASHBOARD}>
                    <>SellerSpot Core Dashboard</>
                    <br />
                    <>
                        Online Server Status:
                        {hearBeatState.onlineServerStatus ? 'Online' : 'Offline'}
                    </>
                </Route>
            </Switch>
        </div>
    );
};
