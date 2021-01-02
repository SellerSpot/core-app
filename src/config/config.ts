export const CONFIG = {
    ENV: process.env.ENV, // development | production
    ONLINE_SERVER_API_URL: 'http://localhost:5000',
    ONLINE_SERVER_SOCKET_URL: 'http://localhost:5000',
    BASE_DOMAIN_NAME: 'sellerspot.in',
    // REDUX STATES
    REDUX_APP_STATE: 'appState',
    REUDX_AUTH_STATE: 'authState',
    REUDX_SUB_DOMAIN_STATE: 'subDomainState',
};

// for any url do not suffix '/' (standard followd in this project) (nest / at use time if needed )
