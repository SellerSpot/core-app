// prefixing with parent is Mandatory and the parent should suffixed with __ (double underscore) before prefixing it with child.

import { zipObject } from 'lodash';

const MANAGEMENT = {
    MANAGEMENT: '/management',
    MANAGEMENT__INSTALLED_PLUGINS: '/management/installedplugins',
    MANAGEMENT__PLUGIN_STORE: '/management/pluginstore',
    /**
     * has :id param, replace :id with string using string.replce on usage
     */
    MANAGEMENT__PLUGIN_STORE__VIEW_PLUGIN: '/management/pluginstore/viewplugin/:id',
    MANAGEMENT__DOMAIN_SETTINGS: '/management/domainsettings',
    MANAGEMENT__BILLING: '/management/billing',
    MANAGEMENT__SETTINGS: '/management/settings',
};

// later move it to separate files
const POS = {
    POS: '/pos',
    POS__SALES: '/pos/sales',
    POS__SALES__NEW_SALE: '/pos/sales/newsale',
    POS__SALES__SALES_HISTORY: '/pos/sales/saleshistory',
    POS__INVENTORY: '/pos/inventory',
    POS__INVENTORY__PRODUCTS: '/pos/inventory/products',
    POS__BILL_SETTINGS: '/pos/billsettings',
};

const CATALOGUE = {
    CATALOGUE: '/catalogue',
    CATALOGUE__PRODUCTS: '/catalogue/products',
    CATALOGUE__BRANDS: '/catalogue/brands',
    CATALOGUE__CATEGORIES: '/catalogue/categories',
    CATALOGUE__STOCKUNITS: '/catalogue/stockunits',
    CATALOGUE__TAXSETTINGS: '/catalogue/taxsettings',
    CATALOGUE__SETTINGS: '/catalogue/settings',
};

const ECOM = {
    ECOM: '/ecom',
};

export const ROUTES = {
    HOME: '/',
    FAIL_SAFE: '/failsafe',
    NOT_FOUND: '/notfound',
    ...MANAGEMENT,
    ...POS,
    ...CATALOGUE,
    ...ECOM,
};

export type TRouteKeys = keyof typeof ROUTES;

export const ROUTE_KEYS = Object.keys(ROUTES);

export const ROUTE_PATHS = Object.values(ROUTES);

export const ROUTES_PATH_VS_KEY = zipObject(Object.values(ROUTES), Object.keys(ROUTES));
