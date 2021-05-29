import { ROUTES, ROUTES_PATH_VS_KEY, TRouteKeys } from 'config/routes';
import { ReactElement, useEffect } from 'react';
import { matchPath, useLocation } from 'react-router';
import RouteManager from 'services/RouteManager';

export const RouteWatcher = (): ReactElement => {
    // listening to location changes
    const location = useLocation();

    // effects
    useEffect(() => {
        // matching the current pathname to a route
        const match = matchPath(location.pathname, {
            path: Object.values(ROUTES),
            exact: true,
            strict: true,
        });
        const route = (ROUTES_PATH_VS_KEY[match?.path] ?? '') as TRouteKeys;
        // updating current route in global store
        RouteManager.updateRoute(route);
    }, [location]);

    return null;
};
