import { ROUTES } from './routes';

// this object's key is directly proporitional to the uniqueName coming along with plugin object from core server,
// used to lanuch the respective plugin via launch button
export const PLUGIN_ROUTES = {
    POINT_OF_SALE: ROUTES.POS,
    ECOMMERCE: ROUTES.ECOM,
};
