export const CONFIG = {
    ENV: process.env.ENV, // development | production
    SERVER_URL: process.env.SERVER_URL,
    LANDING_APP_URL: process.env.LANDING_APP_URL,
    BASE_DOMAIN_NAME: process.env.BASE_DOMAIN_NAME,

    // accounts app routes
    ACCOUNTS_APP_URL: process.env.ACCOUNTS_APP_URL,
    ACCOUNTS_APP_IDENTIFY_STORE_ROUTE: `${process.env.ACCOUNTS_APP_URL}/identifystore`,
    ACCOUNTS_APP_SIGN_IN_ROUTE: `${process.env.ACCOUNTS_APP_URL}/signin?store=`,
};
