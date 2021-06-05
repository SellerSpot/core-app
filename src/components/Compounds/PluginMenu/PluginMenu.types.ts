import { IconifyIcon } from '@iconify/react';
import { TRouteKeys } from 'config/routes';

export interface IPlugin {
    /**
     * Title for the PluginTile
     */
    title: string;
    /**
     * Icon for the PluginTile
     */
    icon: IconifyIcon['icon'];
    /**
     * Redirect route for the PluginTile
     */
    redirectRoute: string;
    /**
     * Route key to uniquely identify each route
     */
    routeKey: TRouteKeys;
}

export type TPlugins = { [k in TRouteKeys]: IPlugin };

export type IUsePluginMenuStore = {
    hoverMenu: boolean;
    expandMenu: boolean;
};
