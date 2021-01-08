export const SOCKET_EVENTS = {
    // Native events
    NATIVE_CONNECT: 'connect',
    NATIVE_DISCONNECT: 'disconnect',
    // Auth events
    AUTH_SIGN_UP: 'signup',
    AUTH_SIGN_IN: 'signin',
    AUTH_VERIFY_TOKEN: 'verifytoken',
    AUTH_DELETE_TENANT_ACCOUNT: 'deleteTenantAccount',

    // domian setup settings
    SUB_DOMAIN_CREATE: 'createsubdomain',
    SUB_DOMAIN_UPDATE: 'updatesubdomain',
    SUB_DOMAIN_AVAILABILITY_CHECK: 'subdomainavailabilitycheck',
    // app events
    APP_GET_ALL_APPS: 'getallapps',
    APP_GET_APP_BY_ID: 'getappbyid',
    APP_GET_APP_BY_SLUG: 'getappbyslug',
    APP_GET_TENANT_INSTALLED_APPS: 'gettenantinstalledapps',
    APP_GET_TENANT_INSTALLED_APP_BY_ID: 'gettenantinstalledappbyid',
    APP_GET_TENANT_INSTALLED_APP_BY_SLUG: 'gettenantinstalledappbyslug',
    APP_INSTALL: 'installapp',
    APP_UNINSTALL: 'uninstallapp',
};
