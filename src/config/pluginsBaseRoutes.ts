import { EPLUGINS } from '@sellerspot/universal-types';

import { ROUTES } from './routes';

export type TAllPlugins = keyof typeof EPLUGINS | keyof typeof EDEFAULT_PLUGINS;

// this object's key is directly proporitional to the uniqueName coming along with plugin object from core server,
// used to lanuch the respective plugin via launch button
type TPluginRoutes = {
    [key in TAllPlugins]: string;
};

export enum EDEFAULT_PLUGINS {
    HOME,
    MANAGEMENT,
}

export const PLUGIN_ROUTES: TPluginRoutes = {
    HOME: ROUTES.HOME,
    MANAGEMENT: ROUTES.MANAGEMENT,
    POINT_OF_SALE: ROUTES.POINT_OF_SALE,
    CATALOGUE: ROUTES.CATALOGUE,
};
