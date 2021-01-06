import { APP_DASHBOARD_NAMES } from './dashboardNames';

export const ROUTES = {
    // auth routes
    Auth: '/auth',
    Auth_SIGN_IN: '/auth/signin',
    Auth_SIGN_UP: '/auth/signup',
    Auth_FORGOT: '/auth/forgot',

    // base routes
    DASHBOARD: '/',
    HOME: '/',
    BILLING: '/billing',
    SETTINGS: '/settings',
    NOTIFICATIONS: '/notifications',
    SUB_DOMAIN_SETUP: '/subdomainsetup',

    // app store routes
    APP_STORE: '/appstore',
    APP_STORE_HOME: '/appstore/home',
    APP_STORE_APPS: '/appstore/apps',
    APP_STORE_PLUGINS: '/appstore/plugins',
    APP_STORE_APP: '/appstore/apps/app', // will contain query param (?id)
    APP_STORE_PLUGIN: '/appstore/plugins/plugin', // will contain query param (?id)

    // installed apps routes
    INSTALLED_APPS: '/installedapps',
    INSTALLED_APPS_HOME: '/installedapps',
    INSTALLED_APPS_APPS: '/installedapps/apps',
    INSTALLED_APPS_APP: '/installedapps/app', // this route containss (:slug) param

    // dashboard routes
    INSTALLED_APP_POINT_OF_SALE: `/installedapps/app/${APP_DASHBOARD_NAMES['point-of-sale']}`,
    INSTALLED_APP_POINT_OF_SALE_HOME: `/installedapps/app/${APP_DASHBOARD_NAMES['point-of-sale']}/home`,
    INSTALLED_APP_POINT_OF_SALE_SETTINGS: `/installedapps/app/${APP_DASHBOARD_NAMES['point-of-sale']}/settings`,
};
