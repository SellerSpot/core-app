import AuthRequest from './AuthRequest';
import * as catalogue from './Catalogue';
import * as management from './Management';

const authRequest = new AuthRequest();

export const requests = {
    authRequest,
    catalogue,
    management,
};
