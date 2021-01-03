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

    // apps related routes
    INSTALLED_APPS: '/installedapps',
    APP_STORE: '/appstore',
    APP_STORE_HOME: '/appstore/home',
    APP_STORE_APPS: '/appstore/apps', // will also be used as params route (:id)
    APP_STORE_PLUGINS: '/appstore/plugins', // will also be used as params route (:id)
};
