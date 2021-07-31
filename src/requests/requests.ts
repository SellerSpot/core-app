import AuthRequest from './AuthRequest';
import * as catalogue from './catalogue';
import * as management from './management';
import * as pos from './pos';

const authRequest = new AuthRequest();

export const requests = {
    authRequest,
    catalogue,
    management,
    pos,
};
