import { initializeGlobalServices } from 'config/globalConfig';
import { ROUTES } from 'config/routes';
import { Dashboard } from 'layouts/Dashboard/Dashboard';
import React, { ReactElement, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import cn from 'classnames';
import styles from './app.module.scss';
import AppPreloader from 'components/Atoms/AppPreloader/AppPreloader';
import { themeSelector } from 'store/models/theme';
import { useSelector } from 'react-redux';
import { colorThemes, fontSizeThemes } from 'config/themes';

// global actions
initializeGlobalServices(); // application common initilizers goes here

export const App = (): ReactElement => {
    const [appLoading, setAppLoading] = useState(true);
    const themeState = useSelector(themeSelector);
    const colors = colorThemes[themeState.colorTheme];
    const fontSizes = fontSizeThemes[themeState.fontSizeTheme];

    return (
        <div className={styles.appWrapper}>
            {appLoading ? (
                <AppPreloader />
            ) : (
                <div className={cn(styles.appContainer)}>
                    <Switch>
                        {/* all other routes should be nested above this route because it is '/' route hence should be placed atlast */}
                        <Route path={ROUTES.DASHBOARD}>
                            <Dashboard />
                        </Route>
                    </Switch>
                </div>
            )}
            {/* global components */}
        </div>
    );
};
