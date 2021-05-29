import { TRouteKeys } from 'config/routes';
import { updateRouteKeys } from 'store/models/route';
import { store } from 'store/store';

export default class RouteManager {
    static updateRoute(routeKey: TRouteKeys): void {
        const routeMatch = this.getRouteKeys(routeKey);
        store.dispatch(updateRouteKeys(routeMatch));
    }

    private static getRouteKeys(rawRouteKey: TRouteKeys): TRouteKeys[] {
        const delimitter = '__';
        const routeKeys = rawRouteKey.split(delimitter);

        const formattedRouteKeys = <TRouteKeys[]>routeKeys.map((_, index) => {
            return routeKeys.slice(0, index + 1).join(delimitter);
        });

        return formattedRouteKeys;
    }
}
