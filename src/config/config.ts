export const CONFIG = {
    ENV: process.env.ENV, // development | production
    ONLINE_SERVER_API_URL: process.env.ONLINE_SERVER_API_URL,
    ONLINE_SERVER_SOCKET_URL: process.env.ONLINE_SERVER_SOCKET_URL,
    BASE_DOMAIN_NAME: process.env.BASE_DOMAIN_NAME,
    // REDUX STATES
    REDUX_APP_STATE: 'appState',
    REUDX_AUTH_STATE: 'authState',
    REUDX_SUB_DOMAIN_STATE: 'subDomainState',
};

console.log(CONFIG);
