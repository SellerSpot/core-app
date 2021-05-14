declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            ENV: 'development' | 'production';
            APP_NAME: string;
            APP_VERSION: string;
            PORT: string;
            SERVER_URL: string;
            LANDING_APP_URL: string;
            BASE_DOMAIN_NAME: string;
        }
    }
}

// convert it into a module by adding an empty export statement.
export {};
