import { ROUTES, ROUTES_PATH_VS_KEY, TRouteKeys } from 'config/routes';
import React, { ReactElement, useEffect } from 'react';
import { matchPath, useLocation } from 'react-router';
import RouteManager from 'services/RouteManager';

export const RouteWatcher = (): ReactElement => {
    const location = useLocation();

    // effects
    useEffect(() => {
        debugger;
        const match = matchPath(location.pathname, {
            path: Object.values(ROUTES),
            exact: true,
            strict: true,
        });
        const route = (ROUTES_PATH_VS_KEY[match?.path] ?? '') as TRouteKeys;
        RouteManager.updateRoute(route);
    }, [location]);

    // draw
    return <></>;
};
