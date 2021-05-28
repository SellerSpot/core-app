export const ROUTES = {
    HOME: '/',
    FAIL_SAFE: '/failsafe',
    MANAGEMENT: {
        DEFAULT: '/management',
    },
    POS: {
        DEFAULT: '/pos',
        SALES: {
            NEW_SALE: '/pos/sales/newsale',
            SALES_HISTORY: '/pos/sales/saleshistory',
        },
        INVENTORY: {
            PRODUCTS: '/pos/inventory/products',
        },
        BILL_SETTINGS: '/pos/billsettings',
    },
    CATALOGUE: {
        DEFAULT: '/catalogue',
        PRODUCTS: '/catalogue/products',
        BRANDS: '/catalogue/brands',
        CATEGORIES: '/catalogue/categories',
        STOCKUNITS: '/catalogue/stockunits',
        TAXBRACKETS: '/catalogue/taxbrackets',
        SETTINGS: '/catalogue/taxbrackets',
    },
    ECOM: {
        DEFAULT: '/ecom',
    },
};
